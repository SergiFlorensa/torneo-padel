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

  // Login simple por prompt (lee VITE_ADMIN_PASSWORD)
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

  // Carga de datos solo si está autenticado
  useEffect(() => {
    if (!autenticado) return;
    const token = import.meta.env.VITE_ADMIN_TOKEN;
    fetch("/.netlify/functions/get-submissions", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Error al obtener datos (${r.status})`);
        return r.json();
      })
      .then((data: Inscripcion[]) => {
        const formateado = data.map((e) => ({
          ...e,
          fecha: new Date(e.fecha).toLocaleString("es-ES"),
        }));
        setDatos(formateado);
      })
      .catch((e) => setError(String(e?.message ?? e)));
  }, [autenticado]);

  // Descargar PDF usando jsPDF UMD + autotable, 100% TypeScript safe
  const descargarPDF = () => {
    const jsPDF = window.jspdf?.jsPDF;
    if (!jsPDF) {
      alert("jsPDF no está disponible. Comprueba que el script está en public/index.html");
      return;
    }

    // Instancia de jsPDF (definido en los types que creaste)
    const doc: JsPDFInstance = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });

    doc.setFontSize(16);
    doc.text("Inscripciones Torneo Pádel", 40, 40);

    const head = [["Fecha", "Miembro 1", "Miembro 2", "Categoría", "Disponibilidad", "Teléfono"]];
    const body = datos.map((d) => [
      d.fecha,
      d.miembro1,
      d.miembro2,
      d.categoria,
      d.disponibilidad,
      d.telefono,
    ]);

    doc.autoTable({
      head,
      body,
      startY: 70,
      styles: { fontSize: 10, cellPadding: 6 },
      headStyles: { fillColor: [230, 230, 230], textColor: 50 },
      theme: "striped",
      margin: { left: 20, right: 20 },
      tableWidth: "auto",
    });

    doc.save("inscripciones_torneo.pdf");
  };

  if (!autenticado) {
    return (
      <div className="p-8 text-center bg-gray-100 min-h-screen text-black">
        <h1 className="text-2xl font-bold mb-4">🔐 Acceso al Panel de Administración</h1>
        <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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
          <div className="flex items-center gap-2 mb-4">
            <button onClick={descargarPDF} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Descargar PDF
            </button>
            <span className="text-sm text-gray-600">Exporta todas las inscripciones a PDF</span>
          </div>
          <div className="overflow-x-auto">
            <table ref={tablaRef} className="min-w-full bg-white shadow rounded-lg">
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
                    <td colSpan={6} className="text-center p-4 text-gray-500">Sin inscripciones</td>
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
