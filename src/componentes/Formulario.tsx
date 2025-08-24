import React, { useState } from "react";

const Formulario: React.FC = () => {
  const [enviando, setEnviando] = useState(false);

  // onSubmit no previene el envío: dejamos que el navegador envíe el form
  // y Netlify haga la redirección a /gracias (action="/gracias").
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setEnviando(true);
    // Aquí puedes agregar lógica adicional si es necesario
  };

  return (
    <section className="bg-neutral-900 rounded-2xl shadow-xl p-6 sm:p-10 text-white max-w-xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-rojoAPE uppercase tracking-wide">
          Inscripción al Torneo
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Rellena los datos de tu pareja y la categoría. Revisaremos la inscripción y contactaremos.
        </p>
      </div>

      <form
        name="Inscripcion_Torneo_ALPHA"           // nombre limpio para Netlify y asunto
        method="POST"
        data-netlify="true"
        action="/gracias"                         // redirección tras envío (Netlify)
        netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {/* Netlify: identificador del formulario */}
        <input type="hidden" name="form-name" value="Inscripcion_Torneo_ALPHA" />

        {/* Honeypot (para bots) - oculto para usuarios */}
        <p className="hidden" aria-hidden>
          <label>Si eres humano no rellenes esto: <input name="bot-field" /></label>
        </p>

        {/* (Opcional) Asunto para ciertos handlers externos - Netlify puede ignorarlo */}
        <input
          type="hidden"
          name="_subject"
          value="📋 Nueva inscripción - Torneo de Pádel · ALPHA (Ed.1)"
        />

        {/* Pareja */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="sr-only" htmlFor="miembro1">Miembro 1</label>
          <input
            id="miembro1"
            type="text"
            name="miembro1"
            placeholder="Miembro 1 (Nombre y apellidos)"
            required
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
            aria-label="Miembro 1"
          />

          <label className="sr-only" htmlFor="miembro2">Miembro 2</label>
          <input
            id="miembro2"
            type="text"
            name="miembro2"
            placeholder="Miembro 2 (Nombre y apellidos)"
            required
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
            aria-label="Miembro 2"
          />
        </div>

        {/* Categoría */}
        <div>
          <label htmlFor="categoria" className="block text-sm font-semibold text-gray-300 mb-1">
            Categoría
          </label>
          <select
            id="categoria"
            name="categoria"
            required
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE"
            aria-label="Categoría"
          >
            <option value="">Selecciona...</option>
            <option>Masculino – Nivel 1</option>
            <option>Masculino – Nivel 2</option>
            <option>Masculino – Nivel 3</option>
            <option>Femenino – Nivel 1</option>
            <option>Femenino – Nivel 2</option>
            <option>Femenino – Nivel 3</option>
            <option>Mixto – Nivel 1</option>
            <option>Mixto – Nivel 2</option>
          </select>
        </div>

        {/* Disponibilidad */}
        <div>
          <label htmlFor="disponibilidad" className="block text-sm font-semibold text-gray-300 mb-1">
            Disponibilidad horaria
          </label>
          <textarea
            id="disponibilidad"
            name="disponibilidad"
            rows={3}
            required
            placeholder="Ej.: tardes L-J (18–22h), fines de semana por la mañana…"
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
            aria-label="Disponibilidad horaria"
          />
        </div>

        {/* Teléfono (informativo) */}
        <div>
          <label htmlFor="telefono" className="block text-sm font-semibold text-gray-300 mb-1">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            name="telefono"
            required
            placeholder="+34 600 000 000"
            pattern="[+\d\s-]{6,20}"
            title="Incluye país, ejemplo: +34 600 123 456"
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
            aria-label="Teléfono"
          />
        </div>

        {/* Consentimiento */}
        <div className="flex items-start">
          <input
            id="consentimiento"
            type="checkbox"
            name="consentimiento"
            required
            className="h-4 w-4 accent-rojoAPE border-gray-600 rounded focus:ring-rojoAPE"
            aria-required="true"
          />
          <label htmlFor="consentimiento" className="ml-2 text-sm text-gray-300">
            Acepto el uso de mis datos para la gestión del torneo
          </label>
        </div>

        {/* Botón */}
        <button
          type="submit"
          disabled={enviando}
          className="w-full py-3 px-4 rounded-lg bg-rojoAPE text-white font-bold shadow hover:opacity-90 transition disabled:opacity-60"
          aria-disabled={enviando}
        >
          {enviando ? "Enviando..." : "Enviar inscripción"}
        </button>
      </form>
    </section>
  );
};

export default Formulario;
