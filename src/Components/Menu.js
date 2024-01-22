import React from 'react'
import { Link,useNavigate,useParams,useSearchParams } from 'react-router-dom'

const Menu = () => {

    const nav =useNavigate()
    const param = useParams()

    const user = localStorage.getItem('user')

    const cerrarSesion = () => {

        if(user){
            localStorage.removeItem('user')
            nav('/')
            return
        }else{
            nav('/Mascotas')
        }


        nav('/login')
    }


    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-success mb-4" >
            <div class="container">
                <a class="navbar-brand" href="#"></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to={"/"}>Inicio</Link>
                        </li>
                       
                    </ul>
                    
                      
                 
                </div>
                <button onClick={cerrarSesion} class="btn btn-primary btn-sm" type="submit">{user ? 'cerrar sesion':'Iniciar sesion'}</button>
            </div>
        </nav>

    )
}

export default Menu