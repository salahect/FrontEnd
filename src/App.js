import {BrowserRouter,Routes,Route} from "react-router-dom";
import MascotasComponent from "./Components/MascotasComponent.js";
import ComponentInicio  from "./Components/ComponentInicio.js";
import './App.css';
import ComponentDescripcion from "./Components/ComponentDescripcion.js";
import ComponentPadre from "./Components/ComponentPadre.js";
import Menu from "./Components/Menu.js";
import Login from "./Components/FormLogin.js";
import ProtegerRouta from "./Components/protegerRouta.js"; 
//import React, { useLocalStorage } from 'react';





function App() { 

  //const [user]=useLocalStorage("user")

  return (
  <BrowserRouter>
    <Menu/>
    
    <Routes>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/' element={<ComponentInicio></ComponentInicio>}></Route>
      <Route path='/Mascotas' element={<MascotasComponent/>}></Route>
      <Route path='/Padres' element={<ProtegerRouta><ComponentPadre/></ProtegerRouta>}></Route>
      <Route path='/ComponentDescripcion/:id' element={<ComponentDescripcion></ComponentDescripcion>}></Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
