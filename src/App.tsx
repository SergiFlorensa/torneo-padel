import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './componentes/Hero';
import Formulario from './componentes/Formulario';
import Sponsors from './componentes/Sponsors';
import PanelAdmin from './paginas/AdminPanel'; // 👈 nuevo

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-oscuro text-white">
      <Hero />
      <main className="flex-1 w-full max-w-3xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Formulario />} />
          <Route path="/admin-panel" element={<PanelAdmin />} /> {/* 👈 nueva ruta */}
        </Routes>
      </main>
      <Sponsors />
    </div>
  );
};

export default App;
