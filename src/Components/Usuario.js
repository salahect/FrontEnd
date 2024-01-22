import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { mostrarAlerta } from '../functions'
import axios from "axios";


const Usuario = () => {


    const url = "http://localhost:8000/usuarios";

    const nav = useNavigate()


    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')

    const registarUsuario = async (e) => {

        e.preventDefault();



        await axios({ method: 'POST', url: `${url}/crearU`, data: { usuario: usuario, password: password } })
            .then((respuesta) => {

                let tipo = respuesta.data.tipo;
                let mensaje = respuesta.data.mensaje;
                mostrarAlerta(mensaje, tipo);
                const usr = {
                    usuario: usuario,
                    password: password
                }
                localStorage.setItem('user', JSON.stringify(usr))
                
                nav('/Mascotas')
              
            })
            .catch((error) => {

                console.log(error)
                mostrarAlerta(`Error en la solicitud`, error)
            });
    }

    return (
        <div>
            <Link type="button" className="" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Registrate
            </Link>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar Usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='container p-4 border rounded' style={{ width: "20rem" }} >
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label">usuario</label>
                                    <input value={usuario} onChange={(e) => { setUsuario(e.target.value) }} type="text" className="form-control" id="usuario" aria-describedby="emailHelp" />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="form-control" id="password" />
                                </div>

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={registarUsuario} className="btn btn-primary btn-sm">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usuario