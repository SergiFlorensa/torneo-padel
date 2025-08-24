import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./componentes/Hero";
import Formulario from "./componentes/Formulario";
import Sponsors from "./componentes/Sponsors";
import Gracias from "./paginas/gracias";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-oscuro text-white">
        <Hero />
        <main className="flex-1 w-full max-w-3xl mx-auto p-6">
          <Routes>
            <Route path="/" element={<Formulario />} />
            <Route path="/gracias" element={<Gracias />} />
          </Routes>
        </main>
        <Sponsors />
      </div>
    </Router>
  );
};

export default App;
