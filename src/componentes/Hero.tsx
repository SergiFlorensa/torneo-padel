const Hero: React.FC = () => (
  <header className="bg-oscuro text-white py-12 px-4 text-center relative overflow-hidden">
    {/* Puedes añadir fondo-grid como en el cartel si tienes la imagen */}
    {/* <div className="absolute inset-0 bg-[url('/fondo-grid.png')] opacity-10" /> */}
    <div className="relative z-10">
      <h1 className="text-3xl md:text-5xl font-extrabold font-montserrat tracking-widest drop-shadow">
        <span className="text-white">ALPHA</span>
        <span className="text-rojoAPE">PADEL</span>
        <span className="text-white">EVENTS</span>
      </h1>
      <p className="mt-3 text-lg uppercase text-gray-300 tracking-widest">
        Edición 2 · <span className="text-rojoAPE font-bold"></span>
      </p>
    </div>
  </header>
);
export default Hero;
