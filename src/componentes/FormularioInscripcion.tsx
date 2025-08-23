import { type FormEvent, useState } from "react";

// Serializa en x-www-form-urlencoded para Netlify Forms
const encode = (data: Record<string, FormDataEntryValue>) =>
  Object.keys(data)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k] as string)}`)
    .join("&");

const FormularioInscripcion: React.FC = () => {
  const [enviando, setEnviando] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);

    const form = e.currentTarget;
    const datos = Object.fromEntries(new FormData(form).entries());

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "inscripcion-padel", ...datos }),
      });
      window.location.href = "/gracias.html";
    } catch {
      alert("Error al enviar. Inténtalo de nuevo.");
      setEnviando(false);
    }
  };

  return (
    <section className="min-h-[100svh] bg-gray-50 px-4 py-[clamp(16px,6svh,40px)] md:py-12">
      <div className="mx-auto max-w-[520px]">
        {/* Tarjeta */}
        <form
          name="inscripcion-padel"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={onSubmit}
          className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)] md:p-7"
        >
          {/* Netlify hidden fields */}
          <input type="hidden" name="form-name" value="inscripcion-padel" />
          <p className="hidden">
            <label>Si eres humano, no rellenes esto: <input name="bot-field" /></label>
          </p>

          {/* Cabecera */}
          <div className="mb-6 text-center md:mb-7">
            <h1 className="text-[clamp(22px,4.8vw,28px)] font-extrabold tracking-wide text-gray-900">
              INSCRIPCIÓN AL TORNEO
            </h1>
          </div>

          {/* Campos */}
          <div className="space-y-4">
            <div>
              <label htmlFor="miembro1" className="mb-1 block text-sm font-medium text-gray-900">
                Miembro 1
              </label>
              <input
                id="miembro1"
                name="miembro1"
                autoComplete="name"
                required
                inputMode="text"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Nombre y apellidos"
              />
            </div>

            <div>
              <label htmlFor="miembro2" className="mb-1 block text-sm font-medium text-gray-900">
                Miembro 2
              </label>
              <input
                id="miembro2"
                name="miembro2"
                autoComplete="name"
                required
                inputMode="text"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Nombre y apellidos"
              />
            </div>

            <div>
              <label htmlFor="categoria" className="mb-1 block text-sm font-medium text-gray-900">
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                required
                className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                defaultValue=""
                aria-describedby="ayuda-categoria"
              >
                <option value="" disabled>
                  Selecciona
                </option>
                <option>Masculino – Nivel 1</option>
                <option>Masculino – Nivel 2</option>
                <option>Masculino – Nivel 3</option>
                <option>Femenino – Nivel 1</option>
                <option>Femenino – Nivel 2</option>
                <option>Femenino – Nivel 3</option>
                <option>Mixto – Nivel 1</option>
                <option>Mixto – Nivel 2</option>
              </select>
              <p id="ayuda-categoria" className="mt-1 text-xs text-gray-500">
                Tres niveles por MASC/FEM y dos en MIXTO.
              </p>
            </div>

            <div>
              <label htmlFor="disponibilidad" className="mb-1 block text-sm font-medium text-gray-900">
                Disponibilidad horaria
              </label>
              <textarea
                id="disponibilidad"
                name="disponibilidad"
                required
                rows={4}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                placeholder="Ej.: tardes de lunes a jueves (18–22h), fines de semana por la mañana…"
              />
            </div>

            {/* Contacto recomendado para gestión */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-gray-900">
                  Teléfono de contacto
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9+\s-]{6,}"
                  required
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="+34 600 000 000"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900">
                  Email (opcional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-[16px] text-gray-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  placeholder="nombre@correo.com"
                />
              </div>
            </div>

            <label className="mt-2 flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-800 ring-1 ring-gray-200">
              <input type="checkbox" name="consentimiento" required className="mt-1 h-4 w-4 accent-blue-600" />
              <span>
                Acepto el uso de mis datos para la gestión del torneo (inscripciones y comunicaciones).
              </span>
            </label>
          </div>

          {/* Botón grande, “dedo friendly” */}
          <div className="sticky bottom-[env(safe-area-inset-bottom)] mt-6">
            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:translate-y-[1px] disabled:opacity-70"
            >
              {enviando ? "Enviando…" : "ENVIAR"}
            </button>
            <p className="mt-2 text-center text-xs text-gray-500">
              3 partidos asegurados · Welcome Pack · Sorteo
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormularioInscripcion;
