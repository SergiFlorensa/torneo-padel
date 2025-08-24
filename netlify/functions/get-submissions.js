// netlify/functions/get-submissions.js
import fetch from "node-fetch";

// Si ya sabes el FORM_ID real, ponlo directo y evitas la llamada extra
const FORM_NAME = "inscripcion-torneo";

// netlify/functions/get-submissions.js

export async function handler() {
  const token = process.env.NETLIFY_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  try {
    const formsRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!formsRes.ok) throw new Error("No se pudo obtener la lista de formularios");

    const forms = await formsRes.json();
    const form = forms.find(f => f.name === "inscripcion-torneo");
    if (!form) throw new Error(`No existe el form inscripcion-torneo`);

    const subsRes = await fetch(
      `https://api.netlify.com/api/v1/forms/${form.id}/submissions`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!subsRes.ok) throw new Error(`Error ${subsRes.status} obteniendo submissions`);

    const submissions = await subsRes.json();

    const mapped = submissions.map(sub => ({
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
