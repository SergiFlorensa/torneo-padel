import { useEffect, useState } from "react";

interface Inscripcion {
  fecha: string;
  miembro1: string;
  miembro2: string;
  categoria: string;
  disponibilidad: string;
  telefono: string;
}

interface Submission {
  created_at: string;
  data: {
    "Miembro 1": string;
    "Miembro 2": string;
    "Categoría": string;
    "Disponibilidad": string;
    "Teléfono": string;
  };
}

export default function AdminPanel() {
  const [datos, setDatos] = useState<Inscripcion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [autenticado, setAutenticado] = useState(false);
  const [intento, setIntento] = useState(false); // Para mostrar mensaje si ha fallado

  const handleLogin = () => {
    const entrada = prompt("Introduce la contraseña:");
    const clave = import.meta.env.VITE_ADMIN_PASSWORD;
    if (entrada === clave) {
      setAutenticado(true);
    } else {
      setIntento(true);
    }
  };

  useEffect(() => {
    if (!autenticado) return;

    const token = import.meta.env.VITE_ADMIN_TOKEN;

    fetch("/.netlify/functions/get-submissions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Error al obtener datos");
        return r.json();
      })
      .then((data: Submission[]) => {
        const formateado: Inscripcion[] = data.map((entry) => ({
          fecha: new Date(entry.created_at).toLocaleString("es-ES"),
          miembro1: entry.data["Miembro 1"],
          miembro2: entry.data["Miembro 2"],
          categoria: entry.data["Categoría"],
          disponibilidad: entry.data["Disponibilidad"],
          telefono: entry.data["Teléfono"],
        }));
        setDatos(formateado);
      })
      .catch((e) => setError(e.message));
  }, [autenticado]);

  if (!autenticado) {
    return (
      <div className="p-8 text-center text-black bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">🔐 Acceso al Panel de Administración</h1>
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Introducir contraseña
        </button>
        {intento && <p className="mt-4 text-red-500">❌ Contraseña incorrecta</p>}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-black">
      <h1 className="text-2xl font-bold mb-4">📋 Inscripciones Torneo Pádel</h1>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
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
              {datos.map((d, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{d.fecha}</td>
                  <td className="border px-4 py-2">{d.miembro1}</td>
                  <td className="border px-4 py-2">{d.miembro2}</td>
                  <td className="border px-4 py-2">{d.categoria}</td>
                  <td className="border px-4 py-2">{d.disponibilidad}</td>
                  <td className="border px-4 py-2">{d.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
