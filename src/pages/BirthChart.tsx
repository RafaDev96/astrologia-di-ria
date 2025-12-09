import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BirthChartForm from '@/components/BirthChartForm';
import { Helmet } from 'react-helmet-async';

export default function BirthChart() {
  return (
    <>
      <Helmet>
        <title>Mapa Astral Completo | Horoscopo da Gabi</title>
        <meta name="description" content="Calcule seu mapa astral completo gratuitamente. Descubra suas posições planetárias, casas astrológicas, aspectos e receba uma mandala personalizada." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-cosmic">
        <Header />
        <main>
          <BirthChartForm />
        </main>
        <Footer />
      </div>
    </>
  );
}
