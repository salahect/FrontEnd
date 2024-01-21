import React from 'react'
import axios from "axios";

import { mostrarAlerta } from '../functions';
const ComponentPadre = ({ id, mascotaModal, mostrarModal }) => {

    const url = "http://localhost:8000/Padres";


    const registrarPadre = async() => {

        const frm =new FormData(document.getElementById('frm'))

        let data={}

        frm.forEach((val,key)=>{
            data[key]=val
        })
       
        await axios({ method: 'POST', url: `${url}/crearP`, data: data })
            .then((respuesta) => {

                let tipo = respuesta.data.tipo;
                let mensaje = respuesta.data.mensaje;
                mostrarAlerta(mensaje, tipo);
                if (tipo === "success") {
                    document.getElementById("btnCerrarModal").click();
                    // getMascotas();
                }
            })
            .catch((error) => {

                console.log(error)
                mostrarAlerta(`Error en la solicitud`, error)
            });
    }


    return (
        <>

            <button type="button" onClick={mostrarModal} id={id} className="btn btn-success btn-sm col-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                adoptar
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">


                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Registrar Adopción {mascotaModal.nombre}  </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id='frm'>
                            <input type="text" value={mascotaModal.id} name='id_mascota' class="invisible" id="id_mascota" aria-describedby="emailHelp" />
                                <div class="mb-3">
                                    <label htmlFor="exampleInputEmail1" class="form-label">Nombre  Completo Padre</label>
                                    <input type="text" name='nombre'  class="form-control" id="nombre" aria-describedby="emailHelp" />

                                </div>
                                <div class="mb-3">
                                    <label htmlFor="exampleInputEmail1" class="form-label">Cedula</label>
                                    <input type="text" name='cedula' class="form-control" id="cedula" aria-describedby="emailHelp" />

                                </div>

                                <div class="mb-3">
                                    <label htmlFor="exampleInputEmail1" class="form-label">Direccion</label>
                                    <input type="text" name='direcion' class="form-control" id="direcion" aria-describedby="emailHelp" />

                                </div>

                                <div class="mb-3">
                                    <label htmlFor="exampleInputEmail1" class="form-label">Telefono</label>
                                    <input type="int" name='telefono' class="form-control" id="telefono" aria-describedby="emailHelp" />

                                </div>
                               
                            </form>
                        </div>
                        <div className="modal-footer">

                            <button

                                type="button" onClick={registrarPadre} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary btn-sm">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComponentPadre