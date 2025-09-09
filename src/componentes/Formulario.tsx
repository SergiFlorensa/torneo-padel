import React, { useState } from "react";
import type { FormEvent } from "react";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )
    .join("&");

const Formulario: React.FC = () => {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    const form = e.currentTarget;
    const formData = Object.fromEntries(
      Array.from(new FormData(form).entries()).map(([key, value]) => [
        key,
        String(value),
      ])
    );

    try {
      const body = encode({ "form-name": "inscripcion-torneo", ...formData });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      if (res.ok) {
        setEnviado(true);
        form.reset();
      } else {
        throw new Error(`Error en el servidor (${res.status})`);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error al enviar. Intenta de nuevo o contacta por WhatsApp."
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="relative bg-neutral-900 rounded-2xl shadow-xl p-6 sm:p-10 text-white max-w-xl mx-auto">
      {/* Modal de éxito */}
      {enviado && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-neutral-800 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-rojoAPE mb-2">
              ¡Inscripción enviada!
            </h3>
            <p className="text-gray-300 mb-4">
              Gracias por apuntarte al torneo de pádel. Te contactaremos pronto.
            </p>
            <button
              onClick={() => setEnviado(false)}
              className="mt-2 inline-block bg-rojoAPE px-4 py-2 rounded-lg text-white hover:opacity-90 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 rounded-md bg-amber-600 text-black px-4 py-3 text-center font-medium shadow-md">
          {error}
        </div>
      )}

      <form
        name="inscripcion-torneo"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={onSubmit}
        className="space-y-6"
      >
        <input type="hidden" name="form-name" value="inscripcion-torneo" />
        <p className="hidden" aria-hidden>
          <label>
            Si eres humano no rellenes esto: <input name="bot-field" />
          </label>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="Miembro 1"
            placeholder="Miembro 1"
            required
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
          />
          <input
            name="Miembro 2"
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
            name="Categoría"
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
            name="Disponibilidad"
            rows={3}
            required
            placeholder="Ej.: Viernes: 18:00, Sabado: 10:00-14:00, Domingo: 16:00"
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Teléfono
          </label>
          <input
            name="Teléfono"
            type="tel"
            required
            placeholder="+34 600 000 000"
            className="block w-full rounded-lg border border-gray-700 bg-neutral-800 px-4 py-2 text-white placeholder-gray-400 focus:border-rojoAPE focus:ring-2 focus:ring-rojoAPE outline-none transition"
          />
        </div>

        <div className="flex items-start">
          <input
            name="Consentimiento"
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
