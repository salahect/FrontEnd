import {BrowserRouter,Routes,Route} from "react-router-dom";
import MascotasComponent from "./Components/MascotasComponent.js";
import ComponentInicio  from "./Components/ComponentInicio.js";
import './App.css';
import ComponentDescripcion from "./Components/ComponentDescripcion.js";
import ComponentPadre from "./Components/ComponentPadre.js";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ComponentInicio></ComponentInicio>}></Route>
      <Route path='/mascotas' element={<MascotasComponent></MascotasComponent>}></Route>
      <Route path='/padres' element={<ComponentPadre></ComponentPadre>}></Route>
      <Route path='/ComponentDescripcion/:id' element={<ComponentDescripcion></ComponentDescripcion>}></Route>
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
