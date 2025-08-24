// netlify/functions/get-submissions.js
// Node 18+ provides a global `fetch`, so no import is required

// Si ya sabes el FORM_ID real, ponlo directo y evitas la llamada extra
const FORM_NAME = "inscripcion-torneo";

export async function handler() {
  const token  = process.env.NETLIFY_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  try {
    // 1. obtener la lista de formularios y hallar el ID del que tenga name=FORM_NAME
    const formsRes = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!formsRes.ok) throw new Error("No se pudo obtener la lista de formularios");
    const forms = await formsRes.json();
    const form = forms.find(f => f.name === FORM_NAME);
    if (!form) throw new Error(`No existe el form ${FORM_NAME}`);

    // 2. obtener las submissions
    const subsRes = await fetch(
      `https://api.netlify.com/api/v1/forms/${form.id}/submissions`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (!subsRes.ok) throw new Error(`Error ${subsRes.status} obteniendo submissions`);
    const submissions = await subsRes.json();

    return { statusCode: 200, body: JSON.stringify(submissions) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
}
