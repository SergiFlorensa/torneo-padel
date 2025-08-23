import React from 'react';
import Hero from './componentes/Hero';
import Formulario from './componentes/Formulario';
import Sponsors from './componentes/Sponsors';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-oscuro text-white">
      <Hero />
      <main className="flex-1 w-full max-w-3xl mx-auto p-6">
        <Formulario />
      </main>
      <Sponsors />
    </div>
  );
};

export default App;
