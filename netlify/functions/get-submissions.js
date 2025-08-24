// netlify/functions/get-submissions.js
import fetch from "node-fetch";

const FORM_NAME = "inscripcion-torneo";

// 👇 Función principal
export async function handler(event) {
  const adminToken = process.env.VITE_ADMIN_TOKEN; // tu token privado definido en Netlify
  const siteId = process.env.NETLIFY_SITE_ID;
  const netlifyToken = process.env.NETLIFY_TOKEN;

  // ✅ Verificación de autenticación
  const authHeader = event.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${adminToken}`) {
    return { statusCode: 401, body: JSON.stringify({ error: "No autorizado" }) };
  }

  try {
    // Obtener todos los formularios del sitio
    const formsRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms`,
      {
        headers: { Authorization: `Bearer ${netlifyToken}` },
      }
    );

    if (!formsRes.ok) throw new Error("No se pudo obtener la lista de formularios");

    const forms = await formsRes.json();
    const form = forms.find((f) => f.name === FORM_NAME);

    if (!form) throw new Error(`No existe el formulario ${FORM_NAME}`);

    // Obtener submissions del formulario
    const subsRes = await fetch(
      `https://api.netlify.com/api/v1/forms/${form.id}/submissions`,
      {
        headers: { Authorization: `Bearer ${netlifyToken}` },
      }
    );

    if (!subsRes.ok) throw new Error(`Error ${subsRes.status} obteniendo submissions`);

    const submissions = await subsRes.json();

    const mapped = submissions.map((sub) => ({
      fecha: sub.created_at,
      miembro1: sub.data["Miembro 1"] || "—",
      miembro2: sub.data["Miembro 2"] || "—",
      categoria: sub.data["Categoría"] || "—",
      disponibilidad: sub.data["Disponibilidad"] || "—",
      telefono: sub.data["Teléfono"] || "—",
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(mapped),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}
