import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeritageCodex() {
  const [sealBroken, setSealBroken] = useState(false);
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: 'On Country',
      content: 'Understanding place, story, and protocol. This sacred codex invites slow, respectful exploration.',
    },
    {
      title: 'Songlines',
      content: 'Routes of knowledge that connect Country and story. Navigate with care and curiosity.',
    },
    {
      title: 'Custodians',
      content: 'Elders, knowledge holders, and community guidance are central to cultural integrity.',
    },
  ];

  return (
    <section className="relative min-h-[80vh] bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-amber-50/70 backdrop-blur-sm" />

      <div className="relative max-w-5xl mx-auto px-4 py-16">
        <div className="rounded-2xl shadow-2xl border border-amber-200/70 overflow-hidden" style={{
          background: "linear-gradient(180deg, #fffaf0, #fff6e5)",
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.04)'
        }}>
          <div className="relative p-6 md:p-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-amber-900">Sacred Digital Codex</h2>
            <p className="mt-2 text-amber-900/80 max-w-2xl">Aged textures, ceremonial transitions, and respectful access shape this experience. Break the wax seal to proceed.</p>

            <div className="mt-8 relative min-h-[320px]">
              <AnimatePresence initial={false} mode="wait">
                {!sealBroken ? (
                  <motion.div
                    key="seal"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center gap-6 py-12"
                  >
                    <WaxSeal onBreak={() => setSealBroken(true)} />
                    <p className="text-amber-900/80">Tap the seal to respectfully open the codex.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`page-${page}`}
                    initial={{ opacity: 0, rotateX: -10 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: 10 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="origin-top"
                  >
                    <PaperPage page={pages[page]} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <ScrollNavigation current={page} total={pages.length} onChange={setPage} />
              <span className="text-xs text-amber-900/70">Cultural protocols guide access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WaxSeal({ onBreak }) {
  return (
    <button
      onClick={onBreak}
      className="relative group outline-none focus-visible:ring-2 focus-visible:ring-amber-600/40 rounded-full"
      aria-label="Break ceremonial wax seal"
    >
      <motion.div
        whileTap={{ scale: 0.92, rotate: -2 }}
        className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-700 to-rose-600 shadow-lg ring-4 ring-amber-200/70 flex items-center justify-center"
      >
        <div className="w-20 h-20 rounded-full bg-[radial-gradient(circle_at_40%_30%,#fff5_0%,#fff0_60%)]" />
      </motion.div>
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-amber-900/80">Wax Seal</span>
    </button>
  );
}

function PaperPage({ page }) {
  return (
    <div
      className="relative rounded-xl p-6 md:p-8 border border-amber-200/70 shadow-lg"
      style={{
        background:
          "url('data:image/svg+xml;utf8,\n            <svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"300\\" height=\\"300\\">\n              <filter id=\\"p\\">\n                <feTurbulence baseFrequency=\\"0.9\\" numOctaves=\\"2\\" seed=\\"2\\" type=\\"fractalNoise\\"/>\n                <feColorMatrix type=\\"saturate\\" values=\\"0\\"/>\n                <feComponentTransfer>\n                  <feFuncA type=\\"table\\" tableValues=\\"0 0.02\\"/>\n                </feComponentTransfer>\n              </filter>\n              <rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23p)\\" fill=\\"#000\\"/>\n            </svg>') repeat, linear-gradient(180deg, #fffaf0, #fff5e6)",
      }}
    >
      <h3 className="text-2xl font-semibold text-amber-900">{page.title}</h3>
      <p className="mt-2 text-amber-900/80 leading-relaxed">{page.content}</p>
      <motion.div className="mt-6 h-40 rounded-lg border border-amber-200/70 bg-amber-50" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
        <div className="w-full h-full bg-[radial-gradient(circle_at_20%_30%,#b4530922,transparent_60%),radial-gradient(circle_at_80%_70%,#b4530933,transparent_60%)] rounded-lg" />
      </motion.div>
    </div>
  );
}

function ScrollNavigation({ current, total, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        className="px-3 py-1.5 rounded-full border border-amber-300 text-amber-900/90 hover:bg-amber-100/60 disabled:opacity-40"
        onClick={() => onChange(Math.max(0, current - 1))}
        disabled={current === 0}
        aria-label="Previous page"
      >
        Prev
      </button>
      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`w-2.5 h-2.5 rounded-full ${i === current ? 'bg-amber-800' : 'bg-amber-300 hover:bg-amber-400'}`}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === current ? 'true' : undefined}
          />
        ))}
      </div>
      <button
        className="px-3 py-1.5 rounded-full border border-amber-300 text-amber-900/90 hover:bg-amber-100/60 disabled:opacity-40"
        onClick={() => onChange(Math.min(total - 1, current + 1))}
        disabled={current === total - 1}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}
