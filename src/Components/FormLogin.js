import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import Usuario from './Usuario'
import { getUsuario } from './consultas'


const Login = () => {

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [usuarios, setUsuarios] = useState([])
   
    const nav = useNavigate()
 

    useEffect(() => {
        cargarUsuario()
    }, [])
    
    const cargarUsuario =async () => {

        const resp =await getUsuario()
        setUsuarios(resp.data)
    }

    const login = (e)=> {
        e.preventDefault();
        
    
        const usr = {
            usuario:usuario,
            password:password,
            
        }
        const user = usuarios.find(e => e.usuario === usuario)

        

        if(!user){
            return
        }

        if(user.password !== password)
            return

        localStorage.setItem('user',JSON.stringify(usr)) 
        nav('/Mascotas')
    }
    return (
        <div className='container text-center '>
            <form className='container p-4 border rounded' style={{width:"20rem"}} >
            <div className="mb-3">
                <label htmlFor="usuario" className="form-label">usuario</label>
                <input value={usuario} onChange={(e)=>{setUsuario(e.target.value)}} type="text" className="form-control" id="usuario" aria-describedby="emailHelp"/>
                   
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" className="form-control" id="password"/>
            </div>
           
            <button onClick = {login}  type="submit" className="btn btn-primary btn-sm">Iniciar sesion</button>

            <hr/>
            <Usuario/>
        </form>


        </div>
    )
}

export default Login