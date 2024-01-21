import React, { useEffect, useState } from "react";
import axios from "axios";
import { mostrarAlerta } from "../functions.js";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";


const registroPadre = () => {
    const url = "http://localhost:8000/Padres";
    const [padres, setPadres] = useState([]);
    const [id, setId] = useState("");
    const [nombre, setNombre] = useState("");
    const [cedula, setCedula] = useState("");
    const [direcion, setDirecion] = useState("");
    const [telefono, setTelefono] = useState("");

    const [operacion, setOperacion] = useState("");
    const [titulo, setTitulo] = useState("");

    useEffect(() => {
        getPadres();
    }, []);

    const getPadres = async () => {
        const respuesta = await axios.get(`${url}/buscarP`);
        setPadres(respuesta.data);
    };

    const openModal = (opcion, id, nombre, cedula, direcion, telefono) => {
        setId('');
        setNombre('');
        setCedula('');
        setDirecion('');
        setTelefono('');
        setOperacion(opcion);
        if (opcion === 1) {
            setTitulo("Registrar padre");
        }
        else if (opcion === 2) {
            setTitulo("Editar padre");
            setId(id);
            setNombre(nombre);
            setCedula(cedula);
            setDirecion(direcion);
            setTelefono(telefono);
        
        }
    };

    const validar = () => {
        let parametros;
        let metodo;
        if (nombre.trim() === '') {
            console.log("Debe escribir un Nombre");
            mostrarAlerta("Debe escribir un Nombre");
        }
        else if (cedula.trim() === '') {
            console.log("Debe escribir tu cedula");
            mostrarAlerta("Debe escribir una correo");
        }
        else {
            if (operacion === 1) {
                parametros = {
                    urlExt: `${url}/crearP`,
                    nombre: nombre.trim(),
                    cedula: cedula.trim(),
                    direccion: direcion.trim(),
                    telefono: telefono.trim()
                };
                metodo = "POST";
            }
            else {
                parametros = {
                    urlExt: `${url}/actualizarP/${id}`,
                    nombre: nombre.trim(),
                    cedula: cedula.trim(),
                    direccion: direcion.trim(),
                    telefono: telefono.trim()
                };
                metodo = "PUT";
            }
            enviarSolicitud(metodo, parametros);

        }

    };


    const enviarSolicitud = async (metodo, parametros) => {
        await axios({ method: metodo, url: parametros.urlExt, data: parametros })
            .then((respuesta) => {
                let tipo = respuesta.data.tipo;
                let mensaje = respuesta.data.mensaje;
                mostrarAlerta(mensaje, tipo);
                if (tipo === "success") {
                    document.getElementById("btnCerrarModal").click();
                    getPadres();
                }
            })
            .catch((error) => {
                mostrarAlerta(`Error en la solicitud`, error)
            });
    };

    const eliminarMascota = (id, nombre) => {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
            title: `Estas seguro de eliminar a este padre ${nombre} ?`,
            icon: 'question',
            text: 'Se eliminará Definitivamente',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setId(id);
                enviarSolicitud("DELETE", { urlExt: `${url}/eliminar/${id}`, id: id })
              
            }
            else {
                mostrarAlerta("No se elimino la mascota", "info");
            }

        })
        getPadres()
    }

    return (

        <div className="App">
            <div className="container-fluid">
                <div className="row mt-3">
                    <div className="col-md-4 offset-md-4">
                        <div className="d-grid mx-auto">

                            <h4>Lista de adopciones</h4>

                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-8 offset-0 offset-lg-2">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NOMBRE</th>
                                        <th>CORREO</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {adopcions.map((padres, i) => (
                                        <tr key={padres.id}>
                                            <td>{padres.id}</td>
                                            <td>{padres.nombre}</td>
                                            <td>{padres.cedula}</td>
                                            <td>
                                                <button
                                                    onClick={() => openModal(2, padres.id, padres.nombre, padres.cedula, padres.direccion, padres.telefono)}
                                                    className="btn btn-warning"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalMascotas"
                                                >
                                                    <i className="fa-solid fa-edit"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => eliminarMascota(padres.id, padres.nombre)}
                                                    className="btn btn-danger">
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id="modalMascotas" className="modal fade" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{titulo}</label>
                        </div>
                        <div className="modal-body">
                            <input type="hidden" id="id"></input>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="text"
                                    id="nombre"
                                    className="form-control"
                                    placeholder="nombre"
                                    value={cliente}
                                    onChange={(e) => setNombre(e.target.value)}
                                ></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="intenger"
                                    id="cedula"
                                    className="form-control"
                                    placeholder="cedula"
                                    value={correo}
                                    onChange={(e) => setCedula(e.target.value)}

                                ></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="text"
                                    id="direcion"
                                    className="form-control"
                                    placeholder="correo"
                                    value={correo}
                                    onChange={(e) => setDirecion(e.target.value)}

                                ></input>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">
                                    <i className="fa-solid fa-gift"></i>
                                </span>
                                <input
                                    type="integer"
                                    id="telefono"
                                    className="form-control"
                                    placeholder="correo"
                                    value={correo}
                                    onChange={(e) => setTelefono(e.target.value)}

                                ></input>
                            </div>
                            <div className="d-grid col-6 mx-auto">
                                <button onClick={() => validar()} className="btn btn-success">
                                    <i className="fa-solid fa-floppy-disk"></i>Guardar
                                </button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                id="btnCerrarModal"
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
                <button></button>
            </div>
        </div>
    );
}

export default registroPadre