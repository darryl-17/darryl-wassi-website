import SmoothScroll from '@/components/SmoothScroll';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Ventures from '@/components/Ventures';
import Timeline from '@/components/Timeline';
import Spotlight from '@/components/Spotlight';
import RrylIntro from '@/components/RrylIntro';
import News from '@/components/News';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { getSiteContent } from '@/sanity/queries';

export const revalidate = 30;

export default async function Home() {
  const { settings, ventures, timeline, news, shows } = await getSiteContent();

  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero settings={settings} />
        <Manifesto settings={settings} />
        <Ventures ventures={ventures} sections={settings.sections} />
        <Timeline items={timeline.slice(0, 4)} showCta sections={settings.sections} />
        <Spotlight sections={settings.sections} />
        <RrylIntro shows={shows} sections={settings.sections} />
        <News news={news} sections={settings.sections} />
        <Newsletter sections={settings.sections} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
