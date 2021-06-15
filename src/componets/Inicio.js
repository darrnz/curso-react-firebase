import React from 'react'

export default function Inicio(props) {

    const { usuario } = props

    return (
        <div>
            Inicio
            <br />
            {usuario? (<p>Hola, {usuario}</p>) : (<span></span>)}
        </div>
    )
}
 