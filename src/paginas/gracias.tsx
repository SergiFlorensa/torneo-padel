import React from 'react';

const PaginaGracias: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-900 text-white p-6">
      <div className="bg-neutral-800 p-10 rounded-xl shadow-lg max-w-md text-center">
        <h1 className="text-3xl font-bold text-rojoAPE mb-4">¡Inscripción enviada!</h1>
        <p className="text-gray-300 mb-6">
          Hemos recibido tus datos correctamente. Te contactaremos pronto con más información sobre el torneo.
        </p>
        <a
          href="/"
          className="inline-block bg-rojoAPE text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition"
        >
          Volver a la página principal
        </a>
      </div>
    </section>
  );
};

export default PaginaGracias;
