import { useState } from 'react';
import CulturalNavigation from './components/CulturalNavigation';
import HomePage from './components/HomePage';
import HeritageCodex from './components/HeritageCodex';
import ArtGallery from './components/ArtGallery';

const routes = [
  { path: '/', label: 'Home' },
  { path: '/heritage-sites', label: 'Sacred Sites' },
  { path: '/art-gallery', label: 'Art Gallery' },
];

export default function App() {
  const [activePath, setActivePath] = useState('/');

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 antialiased">
      <CulturalNavigation activePath={activePath} onNavigate={setActivePath} routes={routes} />

      <main className="relative pt-20">
        {activePath === '/' && <HomePage />}
        {activePath === '/heritage-sites' && <HeritageCodex />}
        {activePath === '/art-gallery' && <ArtGallery />}
      </main>

      <footer className="border-t border-neutral-200 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Aboriginal Heritage — Crafted with cultural respect.</p>
          <p className="opacity-80">Accessibility first • Performance focused • Community guided</p>
        </div>
      </footer>
    </div>
  );
}
