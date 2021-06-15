import React, { useState } from "react";
import { auth } from "../firebase.config";
import { useHistory } from "react-router-dom";

export default function Login(props) {

const { usuario, cerrarSesion } = props
const history = useHistory()

const[msgError, setMsgError] = useState(null)
const [info, setInfo] = useState({
    email: "",
    password: "",
});

const { email, password } = info;

const handleChange = (event) => {
    setInfo({
    ...info,
    [event.target.name]: event.target.value,
    });
    setMsgError(null)
    console.log(info);
};

const RegisterUSer = async (event) => {
    event.preventDefault();
    try {
        await auth.createUserWithEmailAndPassword(email, password)
        await setInfo({
            email: "",
            password: "",
        })
        await alert("Usuario Registrado")
        await history.push('/')
    } catch (error) {
        if(error.code === 'auth/invalid-email') {
            setMsgError('Formato de email incorrecto')
        } 
        if (error.code === 'auth/weak-password') {
            setMsgError('Password muy débil')
        }
    }

};

const LoginUsuario = () => {
    auth.signInWithEmailAndPassword(email, password)
    .then((r) => {
        history.push('/')
    })
    .catch((error) => {
        if(error.code === 'auth/wrong-password') {
            setMsgError('Password incorrecto')
        }
    })
    /* auth/wrong-password */
}

return (
    <div className="row mt-5">
        <div className="col"></div>
        <div className="col flex-column d-flex">
            <form className="form-group mb-2 d-flex flex-column">
                <input
                className="form-control"
                placeholder="email"
                type="email"
                name="email"
                onChange={handleChange}
                />

                <input
                className="form-control mt-2"
                placeholder="password"
                type="pass"
                name="password"
                onChange={handleChange}
                />
                <input
                className="btn mt-2 btn-dark btn-block"
                type="submit"
                value='Registrar usuario'
                onClick={RegisterUSer}
                />
            </form>

            {usuario ? (
                    <>
                        <button onClick={cerrarSesion} className="btn btn-danger btn-block mb-2">
                            Cerrar Sesión
                        </button>
                        <p className='color-white font-size-base text-light' >{usuario}</p>
                        {console.log(usuario)}
                    </>
                ) : (
                    <>
                        <button 
                        className='btn btn-success btn-block mb-2'
                        onClick={LoginUsuario}>Iniciar Sesión
                        </button>
                        {console.log(usuario)}
                    </>
            )}

            
            {
                msgError ? (
                    <div className='alert alert-danger'>{msgError}</div>
                    ) 
                
                : <span></span>

            }
        </div>
        <div className="col"></div>
    </div>
    );
}
