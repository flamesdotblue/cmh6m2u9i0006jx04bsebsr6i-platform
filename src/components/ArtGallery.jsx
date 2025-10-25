import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sampleArtworks = [
  {
    id: '1',
    title: 'River Dreaming',
    artist: 'A. Yunupingu',
    palette: ['#214E34', '#A3B18A', '#DAD7CD', '#3A5A40'],
  },
  {
    id: '2',
    title: 'Desert Song',
    artist: 'M. Napanangka',
    palette: ['#8C3C3C', '#D67D3C', '#E8B25D', '#3C638C'],
  },
  {
    id: '3',
    title: 'Turtle Dreaming',
    artist: 'K. Murrungun',
    palette: ['#0B3D3E', '#2C5530', '#A8D5BA', '#6AA389'],
  },
];

export default function ArtGallery() {
  const [viewMode, setViewMode] = useState('gallery'); // gallery | immersive
  const [activeArtwork, setActiveArtwork] = useState(null);

  const enter = (art) => {
    setActiveArtwork(art);
    setViewMode('immersive');
  };

  return (
    <section className="relative min-h-[80vh] bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Living Art Experience</h2>
            <p className="mt-2 text-neutral-600 max-w-2xl">Explore Aboriginal art through responsive interactions and respectful cultural context.</p>
          </div>
          <div className="flex items-center gap-2">
            <ModeButton label="Gallery" active={viewMode === 'gallery'} onClick={() => setViewMode('gallery')} />
            <ModeButton label="Immersive" active={viewMode === 'immersive'} onClick={() => setViewMode('immersive')} disabled={!activeArtwork} />
          </div>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            {viewMode === 'gallery' && (
              <motion.div key="gallery" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {sampleArtworks.map((a) => (
                  <ArtworkCard key={a.id} artwork={a} onOpen={() => enter(a)} />
                ))}
              </motion.div>
            )}

            {viewMode === 'immersive' && activeArtwork && (
              <motion.div key="immersive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ImmersiveArtView artwork={activeArtwork} onExit={() => setViewMode('gallery')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ModeButton({ label, active, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-full text-sm border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ${
        active ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'
      } disabled:opacity-50`}
    >
      {label}
    </button>
  );
}

function ArtworkCard({ artwork, onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="group relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
      aria-label={`Open ${artwork.title} by ${artwork.artist}`}
    >
      <div className="aspect-[4/3]">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="w-full h-full"
          style={{
            background: `conic-gradient(from 0deg, ${artwork.palette.join(',')})`,
            filter: 'contrast(1.05) saturate(1.05)'
          }}
        />
      </div>
      <div className="p-4 text-left">
        <p className="font-medium">{artwork.title}</p>
        <p className="text-sm text-neutral-600">{artwork.artist}</p>
      </div>
    </button>
  );
}

function ImmersiveArtView({ artwork, onExit }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">{artwork.title}</p>
          <p className="text-sm text-neutral-600">{artwork.artist}</p>
        </div>
        <button onClick={onExit} className="px-3 py-1.5 rounded-full border border-neutral-300 text-neutral-800 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-400">Back to Gallery</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
        <motion.div className="aspect-square rounded-xl border border-neutral-200 overflow-hidden" initial={{ rotate: -1 }} animate={{ rotate: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18 }}>
          <div className="w-full h-full" style={{ background: `conic-gradient(from 45deg, ${artwork.palette.join(',')})` }} />
        </motion.div>
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="font-medium">Cultural Context</p>
            <p className="text-sm text-neutral-600 mt-1">This artwork relates to Country, story, and kinship. Cultural layers are revealed with respect and guidance from community.</p>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <p className="font-medium">Palette</p>
            <div className="mt-3 flex items-center gap-2">
              {artwork.palette.map((c, i) => (
                <div key={i} className="flex-1 h-8 rounded-md border border-neutral-200" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
