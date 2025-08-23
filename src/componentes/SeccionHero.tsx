const SeccionHero: React.FC = () => (
  <header className="relative isolate bg-oscuro">
    <div className="absolute inset-0 bg-[url('/fondo-grid.png')] bg-center opacity-20" />
    <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
      <h1 className="text-4xl font-extrabold tracking-wider">
        <span className="text-white">ALPHA</span>
        <span className="text-rojoAPE">PADEL</span>
        <span className="text-white">EVENTS</span>
      </h1>
      <p className="mt-4 text-lg uppercase tracking-widest text-rojoAPE">
        Edición&nbsp;1 · 22-24&nbsp;ago&nbsp;2025
      </p>
      <ul className="mt-6 space-y-1 text-left sm:inline-block sm:text-center">
        <li>🎁 <b>Sorteo</b> para todos los inscritos</li>
        <li>👕 <b>Welcome&nbsp;Pack</b> con camiseta</li>
        <li>🎾 <b>3&nbsp;partidos</b> asegurados</li>
      </ul>
      <a
        href="#formulario"
        className="mt-8 inline-block rounded-lg bg-rojoAPE px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
      >
        Inscribirme
      </a>
    </div>
  </header>
);

export default SeccionHero;
