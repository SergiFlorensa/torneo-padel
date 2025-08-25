import { useEffect, useState, useRef } from "react";

interface Inscripcion {
  fecha: string;
  miembro1: string;
  miembro2: string;
  categoria: string;
  disponibilidad: string;
  telefono: string;
}

export default function AdminPanel() {
  const [datos, setDatos] = useState<Inscripcion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [autenticado, setAutenticado] = useState(false);
  const [intentoFallido, setIntentoFallido] = useState(false);
  const tablaRef = useRef<HTMLTableElement | null>(null);

  /* ----------  login sencillo ---------- */
  const handleLogin = () => {
    const entrada = prompt("Introduce la contraseña:");
    if (entrada === import.meta.env.VITE_ADMIN_PASSWORD) {
      setAutenticado(true);
      setIntentoFallido(false);
    } else {
      setIntentoFallido(true);
    }
  };

  /* ----------  carga de datos ---------- */
  useEffect(() => {
    if (!autenticado) return;
    fetch("/.netlify/functions/get-submissions", {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data: Inscripcion[]) =>
        setDatos(
          data.map((d) => ({
            ...d,
            fecha: new Date(d.fecha).toLocaleString("es-ES"),
          })),
        ),
      )
      .catch((e) => setError(String(e)));
  }, [autenticado]);

  /* ----------  descarga PDF con html2pdf ---------- */
  const descargarPDF = () => {
    if (!tablaRef.current) return;
    const html2pdf = window.html2pdf;
    if (!html2pdf) {
      alert("html2pdf no cargó. Revisa el <script> en public/index.html");
      return;
    }

    html2pdf()
      .set({
        margin: 0.5,
        filename: "inscripciones_torneo.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      })
      .from(tablaRef.current)
      .save();
  };

  /* ----------  vistas ---------- */
  if (!autenticado) {
    return (
      <div className="p-8 text-center bg-gray-100 min-h-screen text-black">
        <h1 className="text-2xl font-bold mb-4">🔐 Acceso al Panel de Administración</h1>
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
          Introducir contraseña
        </button>
        {intentoFallido && <p className="mt-4 text-red-500">❌ Contraseña incorrecta</p>}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">📋 Inscripciones Torneo Pádel</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!error && (
        <>
          <button onClick={descargarPDF} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded">
            Descargar PDF
          </button>

          <div className="overflow-x-auto">
            <table ref={tablaRef} className="min-w-full bg-white shadow rounded">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-3 py-2">Fecha</th>
                  <th className="px-3 py-2">Miembro 1</th>
                  <th className="px-3 py-2">Miembro 2</th>
                  <th className="px-3 py-2">Categoría</th>
                  <th className="px-3 py-2">Disponibilidad</th>
                  <th className="px-3 py-2">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {datos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      Sin inscripciones
                    </td>
                  </tr>
                ) : (
                  datos.map((d, i) => (
                    <tr key={i}>
                      <td className="border px-3 py-2">{d.fecha}</td>
                      <td className="border px-3 py-2">{d.miembro1}</td>
                      <td className="border px-3 py-2">{d.miembro2}</td>
                      <td className="border px-3 py-2">{d.categoria}</td>
                      <td className="border px-3 py-2">{d.disponibilidad}</td>
                      <td className="border px-3 py-2">{d.telefono}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
