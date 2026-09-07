import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import LandmarksSection from '@/components/LandmarksSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import WeatherSection from '@/components/WeatherSection';
import SeasonalGuideSection from '@/components/SeasonalGuideSection';
import VisitPlansSection from '@/components/VisitPlansSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import ResponsibilitySection from '@/components/ResponsibilitySection';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <InfoSection />
        <BasicInfo />
        <WeatherSection />
        <SeasonalGuideSection />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <RouteSection />
        <VisitPlansSection />
        <LandmarksSection />
        <PhotoSpotsSection />
        <HotelsSection />
        <FacilitiesSection />
        <Gallery />
        <Reviews />
        <FaqSection />
        <SourcesSection />
        <ResponsibilitySection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
