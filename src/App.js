// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './views/externos/Login';
import Aside from './views/Aside';
import Dashboard from './views/Dashboard';
import Usuario from './views/Mantenimientos/Usuario';
import TitulosAcademicos from "./views/Mantenimientos/TitulosAcademicos"
import Materias from "./views/Mantenimientos/Materias";
import Horarios from "./views/Mantenimientos/Horarios";
import NewHorario from "./components/NewHorario"
import Paralelos from "./views/Mantenimientos/Paralelo"
function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("autenticacion") ?? false);

  return (
    <Router>
      {!isLogin && (
        <Routes>  
          <Route path="/login" element={<Login/> } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      {isLogin && (
        <Aside>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Mantenimientos/usuarios" element={<Usuario />} />
            <Route path="/Mantenimientos/titulo_academico" element={<TitulosAcademicos />} />
            <Route path="/Mantenimientos/materias" element={<Materias />} />
            <Route path="/Mantenimientos/Horarios" element={<Horarios />} />
            <Route path="/Mantenimientos/Horarios/formulario-horario" element={<NewHorario />} />
            <Route path="/Mantenimientos/Paralelos" element={<Paralelos />} />
          </Routes>
        </Aside>
      )}

    </Router>
  );
}

export default App;
