import React from 'react'
import { Link } from 'react-router-dom'
import ComponentPadre from './ComponentPadre'
import max from '../img/max.jpg'

const ComponentCard = ({ mascota, mostrarModal, id, mascotaModal }) => {

    return (
        <div className='col'>

            <div className="card " style={{ width: "100%" }}>
                       
                <img src= {max} className="card-img-top" alt="mascota" />
                    <div className="card-body">
                        
                         <h5 className="card-title">{mascota.nombre}</h5>
                            <h5 className="card-title">{mascota.edad}</h5>
                            <h5 className="card-title">{mascota.raza}</h5>
                            <h5 className="card-title">{mascota.tipo}</h5>
                            <p className="card-text">solo quiero tu amor</p>
                            
                            <div className='row'>
                                
                                <Link to={`/ComponentDescripcion/${mascota.id}`} className="btn btn-primary btn-sm col-5">detalle</Link>
                                <p className='col-2'></p>
                                <ComponentPadre mascota={mascota} mostrarModal={mostrarModal} mascotaModal={mascotaModal} id={id} />
                            </div>
                            
                        </div>
                        
                          
            </div>
            
                  
        </div>

        
    )
    
}

export default ComponentCard