import { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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

  // Login sencillo por prompt (usa VITE_ADMIN_PASSWORD)
  const handleLogin = () => {
    const entrada = prompt("Introduce la contraseña:");
    const ok = entrada === import.meta.env.VITE_ADMIN_PASSWORD;
    setAutenticado(ok);
    setIntentoFallido(!ok);
  };

  // Carga de datos si autenticado
  useEffect(() => {
    if (!autenticado) return;
    fetch("/.netlify/functions/get-submissions", {
      headers: { Authorization: `Bearer ${import.meta.env.VITE_ADMIN_TOKEN}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(`Error ${r.status}`)))
      .then((data: Inscripcion[]) =>
        setDatos(
          data.map((d) => ({ ...d, fecha: new Date(d.fecha).toLocaleString("es-ES") }))
        )
      )
      .catch((e) => setError(String(e)));
  }, [autenticado]);

  // 📄 Descargar PDF con jsPDF + html2canvas
  const descargarPDF = async () => {
    if (!tablaRef.current) return;

    const tabla = tablaRef.current;

    // Captura de la tabla como imagen
    const canvas = await html2canvas(tabla, {
      scale: 2, // más resolución
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("inscripciones.pdf");
  };

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
      <div className="no-print flex items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold">📋 Inscripciones Torneo Pádel</h1>
        <button onClick={descargarPDF} className="px-4 py-2 bg-blue-600 text-white rounded">
          Descargar PDF
        </button>
        <span className="text-sm text-gray-600">Se descargará automáticamente.</span>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
                <td colSpan={6} className="p-4 text-center text-gray-500">Sin inscripciones</td>
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
    </div>
  );
}
