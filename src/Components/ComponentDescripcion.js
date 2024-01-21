import React, { useEffect, useState } from 'react'
import { Link,useParams  } from 'react-router-dom'
import { getMascotasById } from './consultas'
import laimagen from '../img/broly.png'

const ComponentDescripcion = () => {


    const { id } = useParams()

    const [mascota, setmascota] = useState({})

    const cargarMascota = async() => {
        const res =await getMascotasById(id)
        setmascota(res.data)
    }

    useEffect(() => {
      
        cargarMascota()
    
    }, [])
    
    return (
        <div className='container'>
            <div className='row '>
             
                <div class="text-center col-6">
                    <img src={laimagen} width={"100%"} class="rounded" alt="..." />
                </div>
                <br/>
                <div className='text-center col-6'>
                    <h1>Nombre: {mascota.nombre}</h1>
                    <p>Edad: {mascota.edad}</p>
                    <p>Raza: {mascota.raza}</p>
                    <p>Tipo: {mascota.tipo}</p>
                    <p>Descripcion</p>
                    <p>{mascota.descripcion} </p>
                
                    <Link to={'/'} className='btn btn-primary'>Regresar</Link>
                </div>

             
            </div>
           
        </div>
    )
}

export default ComponentDescripcion