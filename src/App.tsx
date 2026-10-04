import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TikTokGrid } from './components/TikTokGrid';
import { ManifestoSection } from './components/ManifestoSection';
import { SubscribeSection } from './components/SubscribeSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-white selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        onJoinListClick={() => scrollToSection('subscribe')}
        onDropsClick={() => scrollToSection('latest-drops')}
        onManifestoClick={() => scrollToSection('manifesto')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onWatchMotivation={() => scrollToSection('latest-drops')}
          onExploreManifesto={() => scrollToSection('manifesto')}
        />

        {/* Second Section: Grid of TikTok videos / Latest Drops */}
        <TikTokGrid
          onJoinListClick={() => scrollToSection('subscribe')}
        />

        {/* Brand Creed / Manifesto */}
        <ManifestoSection />

        {/* Third Section: Email subscriber list / Don't Miss The Message */}
        <SubscribeSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
