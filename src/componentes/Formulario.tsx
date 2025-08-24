import { useState } from "react";

const Formulario: React.FC = () => {
  const [enviando, setEnviando] = useState(false);

  const onSubmit = () => {
    setEnviando(true);
    // No evitamos el envío para permitir a Netlify procesar y redirigir a /gracias
  };

  return (
    <section className="bg-neutral-900 rounded-2xl shadow-xl p-6 sm:p-10 text-white max-w-xl mx-auto">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-extrabold text-rojoAPE uppercase tracking-wide">
          Inscripción al Torneo
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Rellena los datos de tu pareja y categoría
        </p>
      </div>

      <form
        name="Inscripcion_Torneo_ALPHA"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        action="/gracias"
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {/* Netlify */}
        <input type="hidden" name="form-name" value="Inscripcion_Torneo_ALPHA" />
        <p className="hidden" aria-hidden>
          <label>
            Si eres humano no rellenes esto: <input name="bot-field" />
          </label>
        </p>
        <input
          type="hidden"
          name="_subject"
          value="📋 Nueva inscripción - Torneo de Pádel · ALPHA (Ed.1)"
        />

        {/* Campos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="miembro1"
            placeholder="Miembro 1"
            required
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
          />
          <input
            name="miembro2"
            placeholder="Miembro 2"
            required
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Categoría
          </label>
          <select
            name="categoria"
            required
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE"
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

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Disponibilidad horaria
          </label>
          <textarea
            name="disponibilidad"
            rows={3}
            required
            placeholder="Ej.: tardes L-J (18–22h), fines de semana por la mañana…"
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Teléfono
          </label>
          <input
            name="telefono"
            type="tel"
            required
            placeholder="+34 600 000 000"
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
          />
        </div>

        <div className="flex items-start">
          <input
            name="consentimiento"
            type="checkbox"
            required
            className="h-4 w-4 accent-rojoAPE border-gray-600 rounded focus:ring-rojoAPE"
          />
          <label className="ml-2 text-sm text-gray-300">
            Acepto el uso de mis datos para la gestión del torneo
          </label>
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="bg-gray-500 w-full py-3 px-4 rounded-lg bg-rojoAPE text-white font-bold shadow hover:opacity-90 transition disabled:opacity-60"
        >
          {enviando ? "Enviando..." : "Enviar inscripción"}
        </button>
      </form>
    </section>
  );
};

export default Formulario;
