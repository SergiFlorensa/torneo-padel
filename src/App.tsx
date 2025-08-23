import SeccionHero from './componentes/SeccionHero.tsx';
import FormularioInscripcion from './componentes/FormularioInscripcion.tsx';
import SeccionSponsors from './componentes/SeccionSponsors.tsx';

const App: React.FC = () => (
  <main className="min-h-screen bg-oscuro text-white">
    <SeccionHero />
    <section id="formulario" className="flex justify-center py-16 px-4">
      <FormularioInscripcion />
    </section>
    <SeccionSponsors />
  </main>
);

export default App;
