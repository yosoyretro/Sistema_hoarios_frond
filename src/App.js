import { Route, Routes,BrowserRouter as Router } from "react-router-dom";
import Usuarios from "./views/Mantenimientos/Usuarios";
import Perfiles from "./views/Mantenimientos/Perfiles";
import Cursos from "./views/Mantenimientos/Cursos";
import Paralelos from "./views/Mantenimientos/Paralelos";
import EducacionGlobal from "./views/Mantenimientos/EducacionGlobal";
import NewEducacionGlobal from "./views/Formularios/NewEducacionGlobal";

import Aside from "./components/Aside";
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
          <Route path="/Formulario/crearEducacionGobal" element={<NewEducacionGlobal/>}/>
        </Routes>
      </Aside>
    </Router>
  );
}

export default App;
