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
  const tablaRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    const entrada = prompt("Introduce la contraseña:");
    const clave = import.meta.env.VITE_ADMIN_PASSWORD;
    if (entrada === clave) {
      setAutenticado(true);
      setIntentoFallido(false);
    } else {
      setIntentoFallido(true);
    }
  };

  useEffect(() => {
    if (!autenticado) return;
    const token = import.meta.env.VITE_ADMIN_TOKEN;
    fetch("/.netlify/functions/get-submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Error al obtener datos");
        return r.json();
      })
      .then((data: Inscripcion[]) => {
        const formateado = data.map((e) => ({
          ...e,
          fecha: new Date(e.fecha).toLocaleString("es-ES"),
        }));
        setDatos(formateado);
      })
      .catch((e) => setError(e.message));
  }, [autenticado]);

  const descargarPDF = () => {
  if (!tablaRef.current || !window.html2pdf) return;

  const opt = {
    margin: 0.5,
    filename: "inscripciones_torneo.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
  };

  window.html2pdf().set(opt).from(tablaRef.current).save();
};


  if (!autenticado) {
    return (
      <div className="p-8 text-center bg-gray-100 min-h-screen text-black">
        <h1 className="text-2xl font-bold mb-4">
          🔐 Acceso al Panel de Administración
        </h1>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Introducir contraseña
        </button>
        {intentoFallido && (
          <p className="mt-4 text-red-500">❌ Contraseña incorrecta</p>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">📋 Inscripciones Torneo Pádel</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!error && (
        <>
          <button
            onClick={descargarPDF}
            className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Descargar PDF
          </button>

          <div ref={tablaRef} className="overflow-x-auto bg-white p-4 rounded shadow">
            <table className="min-w-full">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Miembro 1</th>
                  <th className="px-4 py-2">Miembro 2</th>
                  <th className="px-4 py-2">Categoría</th>
                  <th className="px-4 py-2">Disponibilidad</th>
                  <th className="px-4 py-2">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {datos.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-gray-500">
                      Sin inscripciones
                    </td>
                  </tr>
                ) : (
                  datos.map((d, i) => (
                    <tr key={i}>
                      <td className="border px-4 py-2">{d.fecha}</td>
                      <td className="border px-4 py-2">{d.miembro1}</td>
                      <td className="border px-4 py-2">{d.miembro2}</td>
                      <td className="border px-4 py-2">{d.categoria}</td>
                      <td className="border px-4 py-2">{d.disponibilidad}</td>
                      <td className="border px-4 py-2">{d.telefono}</td>
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
