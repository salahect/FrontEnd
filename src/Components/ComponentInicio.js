import React, { useEffect, useState } from 'react'
import Card from './ComponentCard'
import { getMascotas } from './consultas'

const Inicio = () => {

    const [mascotas, setmascotas] = useState([])
    const [nombre, setNombre] = useState({id:'',nombre:'',edad:''})

    const cargarMascota = async () => {
        const res = await getMascotas()
        setmascotas(res.data)
    }

    useEffect(() => {
        cargarMascota()
    }, [])


    const mostrarModal = (e)=> {
        
        const mascota =mascotas.find(a => a.id == e.target.id)
    
        setNombre(mascota)
    }


    return (

        <div className='container'>
            <div className=' row rows-cols-2 row-cols-md-4 g-6'>
                {
                    mascotas.map(m => (
                        <Card key={m.id} mostrarModal={mostrarModal}  mascota={m} mascotaModal={nombre} id={m.id}/>
                    ))
                }
             
            </div>
        </div>

    )
}

export default Inicio