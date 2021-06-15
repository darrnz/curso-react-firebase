import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebase.config";

export default function Menu(props) {
    const { usuario, cerrarSesion, setUsuario } = props;

    return (
        <div>
        <nav className="navbar navbar-expand-ld navbar-dark bg-dark flex justify-content-strech flex-wrap">
            <ul className="navbar-nav mr-auto flex flex-row justify-content-around">
            <li className="nav-item p-2">
                <Link className="nav-link" to="/">
                Inicio
                </Link>
            </li>
            <li className="nav-item p-2">
                {
                    usuario? 
                    (
                        <p>{usuario}</p>
                    ) 
                    :
                    (
                        <Link className="nav-link" to="/login">
                        Login
                        </Link>
                    )
                }

            </li>
            <li className="nav-item p-2">
                <Link className="nav-link" to="/admin">
                Admin
                </Link>
            </li>
            <li className="nav-item p-2">
                <Link className="nav-link" to="/form">Formulario</Link>
            </li>
            </ul>
            {usuario ? (
            <>
                <button onClick={cerrarSesion} className="btn btn-danger">
                    Cerrar Sesión
                </button>
                <p className='color-white font-size-base text-light' >{usuario}</p>
                {console.log(usuario)}
            </>
            ) : (
            <span></span>
            )}
        </nav>
        </div>
    );
}
