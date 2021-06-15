import React, { useState, useEffect } from 'react'
import { db } from '../firebase.config'

export default function Form() {

    const [infoForm, setInfoForm] = useState({
        nombre: '',
        phone: ''
    })
    const[usuario, setUsuario] = useState([])
    const[error, setError] = useState(null)
    const[updateState, setUpdateState] = useState(false)
    const[idUserAgenda, setIdUserAgenda] = useState('')

    function handleOnChange(event) {
        setInfoForm({
            ...infoForm,
            [event.target.name]: event.target.value
        })
        setError(null)
    }
    
    useEffect(() => {
        const getUsuarios = async() => {
            const { docs } = await db.collection('agenda').get()
            // const { docs }
            console.log({ docs })
            const newArray = docs.map(item => ({id: item.id, ...item.data() }))
            //respuesta.docs
            console.log('newArray', newArray)
            setUsuario(newArray)
        }
        getUsuarios()
        //setUsuario(getUsuarios())
        console.log(setUsuario)
    }, [])

    async function submitForm(event) {
        event.preventDefault()
        if(!infoForm.nombre.trim() || !infoForm.phone.trim()) {
            setError('El campo está vacío')
        }

        if(updateState === false ) {
            try {
                const usuarioInfo = await infoForm
                const data = await db.collection('agenda').add(usuarioInfo)
                const { docs } = await db.collection('agenda').get()
                // const { docs }
                console.log({ docs })
                const newArray = docs.map(item => ({id: item.id, ...item.data() }))
                //respuesta.docs
                console.log('newArray', newArray)
                setUsuario(newArray)
                console.log(data)
                console.log('tarea añadida')
                setInfoForm({
                    nombre: '',
                    phone: ''
            })

            } catch (error) {
                console.log(error)
            }

        } else {
            try {
                await db.collection('agenda').doc(idUserAgenda).set(infoForm)
                await setUpdateState(false)
                setInfoForm({
                    nombre: '',
                    phone: ''
                })
                alert('Informacion actualizada')
                const { docs } = await db.collection('agenda').get()
                const newArray = docs.map(item => ({id: item.id, ...item.data() }))
                setUsuario(newArray)
                setIdUserAgenda(null)
            } catch (error) {
                console.log(error)
            }
        }


    }

    async function deleteEntry(event,id) {
        event.preventDefault()

        try {
            await db.collection('agenda').doc(id).delete()
            const { docs } = await db.collection('agenda').get()
            const newArray = docs.map(item => ({id: item.id, ...item.data() }))
            setUsuario(newArray)
        } catch (error) {
            console.log(error)
        }
    }

    async function actualizarInfo(event, id) {
        event.preventDefault()
        const data = await db.collection('agenda').doc(id).get()
        console.log(data.data())
        const { nombre, phone } = data.data()
        setInfoForm({
            nombre: nombre,
            phone: phone
        })
        setUpdateState(true)
        setIdUserAgenda(id)
    }



    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h2>Formulario de usuarios</h2>
                    <form className='form-group'>
                        <input 
                            className='form-control'
                            type='text'
                            placeholder='nombre'
                            name='nombre'
                            value={infoForm.nombre}
                            onChange={handleOnChange}/>
                        <input
                            className='form-control my-3'
                            placeholder='numero'
                            type='text'
                            name='phone'
                            value={infoForm.phone}
                            onChange={handleOnChange} />
                        {
                            updateState? (
                                <button 
                                    onClick={submitForm}
                                    className='btn btn-warning btn-block'>
                                Actualizar info        
                                </button>
                            ):
                            (
                                <button 
                                    onClick={submitForm}
                                    className='btn btn-dark btn-block'>
                                Agregar        
                                </button>
                            )
                        }
                    </form>
                    {
                        error ? <div>{error}</div> : <span></span>
                    }
                </div>
                <div className='col'>
                    <h2>Lista de Agenda</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Tel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            !usuario? <span>Cargando...</span> :
                                usuario.map((user) => {
                                    return(
                                    <tr key={user.id}>
                                        <td>{user.nombre}</td>
                                        <td>{user.phone}</td>
                                        <td><button className='btn btn-danger' onClick={(event) => deleteEntry(event, user.id)}>eliminar</button></td>
                                        <td className='mx-4'><button className='mx-4 btn btn-info' onClick={(event) => actualizarInfo(event, user.id)}>actualizar</button></td>
                                    </tr>      
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            
        </div>
    )
}
