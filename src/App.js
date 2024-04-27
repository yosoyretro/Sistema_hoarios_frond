import { Route, Routes,BrowserRouter as Router } from "react-router-dom";
import Usuarios from "./views/Mantenimientos/Usuarios";
import Perfiles from "./views/Mantenimientos/Perfiles";
import Cursos from "./views/Mantenimientos/Cursos";
import Paralelos from "./views/Mantenimientos/Paralelos";
import Materias from "./views/Mantenimientos/Materias";
import EducacionGlobal from "./views/Mantenimientos/EducacionGlobal";
import TitulosAcademicos from "./views/Mantenimientos/TitulosAcademicos";
import Horarios from "./views/Mantenimientos/Horarios";
import NewEducacionGlobal from "./views/Formularios/NewEducacionGlobal";

import Aside from "./components/Aside";
import AsignacionCarreras from "./views/Asignaciones/AsignacionCarreras";
function App() {

  return (
    <Router>
      <Aside>
        <Routes>
          <Route path="/Mantenimientos/usuarios" element={<Usuarios />}/>
          <Route path="/Mantenimientos/perfiles" element={<Perfiles />}/>
          <Route path="/Mantenimientos/cursos" element={<Cursos />}/>
          <Route path="/Mantenimientos/paralelos" element={<Paralelos />}/>
          <Route path="/Mantenimientos/educacionGobal" element={<EducacionGlobal />}/>
          <Route path="/Mantenimientos/materias" element={<Materias/>}/>
          <Route path="/Mantenimientos/tituloacademico" element={<TitulosAcademicos/>}/>
          <Route path="/Mantenimientos/horarios" element={<Horarios/>}/>
          <Route path="/Formulario/crearEducacionGobal" element={<NewEducacionGlobal/>}/>
          <Route path="/Asignacion/Carreras" element={<AsignacionCarreras/>}/>
        </Routes>
      </Aside>
    </Router>
  );
}

export default App;
