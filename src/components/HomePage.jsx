import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function getAustralianSeason(date = new Date()) {
  const month = date.getMonth();
  if (month === 11 || month <= 1) return 'summer';
  if (month >= 2 && month <= 4) return 'autumn';
  if (month >= 5 && month <= 7) return 'winter';
  return 'spring';
}

const seasonalTokens = {
  summer: { bg: '#e8b25d', accent: '#8c3c3c' },
  autumn: { bg: '#8c6d46', accent: '#d67d3c' },
  winter: { bg: '#4a7c59', accent: '#3c638c' },
  spring: { bg: '#a8d5ba', accent: '#2c5530' },
};

export default function HomePage() {
  const [season, setSeason] = useState(getAustralianSeason());
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    const i = setInterval(() => setSeason(getAustralianSeason()), 60_000);
    return () => clearInterval(i);
  }, []);

  const token = useMemo(() => seasonalTokens[season], [season]);

  return (
    <section
      className="relative overflow-hidden"
      aria-label="Home — Welcoming Cultural Gateway"
      style={{ background: token.bg }}
    >
      <LivingLandscapeHeader accent={token.accent} />

      <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-20">
        <div className="relative rounded-2xl p-6 md:p-10 shadow-2xl" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.88))',
          border: '8px solid transparent',
          borderImage: `url("data:image/svg+xml,${encodeURIComponent(handPaintedBorderSVG(token.accent))}") 30 / 12px / 8px round`,
        }}>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-neutral-900">Welcome to Country</h1>
          <p className="mt-3 md:mt-4 text-neutral-700 max-w-2xl">A respectful, living gateway to Aboriginal culture. Explore stories, sacred sites, art, and native foods through immersive, accessible experiences crafted with community guidance.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard title="Season" value={season.charAt(0).toUpperCase() + season.slice(1)} description="Dynamic seasonal background reflects Country." />
            <AnimatedStatistic label="Communities engaged" value={72} />
            <AnimatedStatistic label="Cultural assets optimized" value={312} />
          </div>
        </div>

        <div className="mt-10">
          <CulturalTimeline accent={token.accent} />
        </div>
      </div>

      <AnimatePresence>
        {welcome && (
          <CulturalWelcome onComplete={() => setWelcome(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function handPaintedBorderSVG(color = '#8c3c3c') {
  return `\n<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'>\n  <defs>\n    <pattern id='dots' width='8' height='8' patternUnits='userSpaceOnUse'>\n      <circle cx='4' cy='4' r='1.2' fill='${color}'/>\n    </pattern>\n  </defs>\n  <rect x='0' y='0' width='60' height='60' fill='url(#dots)' opacity='0.6'/>\n</svg>`;
}

function LivingLandscapeHeader({ accent }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          backgroundImage:
            `radial-gradient(1200px 400px at 20% -10%, ${accent}11, transparent),` +
            `radial-gradient(1000px 400px at 80% -10%, ${accent}0f, transparent)`,
        }}
      />
      <motion.svg
        className="absolute -top-10 left-0 right-0 w-[160%] -ml-[30%]"
        height="220"
        viewBox="0 0 1600 220"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ repeat: Infinity, repeatType: 'mirror', duration: 8, ease: 'easeInOut' }}
      >
        <path d="M0,120 C400,180 1200,60 1600,140 L1600,0 L0,0 Z" fill={`${accent}22`} />
        <path d="M0,160 C300,220 1300,120 1600,180 L1600,0 L0,0 Z" fill={`${accent}18`} />
      </motion.svg>
    </div>
  );
}

function InfoCard({ title, value, description }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur">
      <p className="text-xs uppercase tracking-wider text-neutral-500">{title}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-2 text-neutral-600 text-sm">{description}</p>
    </div>
  );
}

function AnimatedStatistic({ label, value }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 1200;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.floor(value * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div className="rounded-xl border border-neutral-200 bg-white/80 p-5 backdrop-blur">
      <p className="text-xs uppercase tracking-wider text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{count.toLocaleString()}</p>
      <div className="mt-2 h-2 rounded-full bg-neutral-100">
        <motion.div className="h-2 rounded-full bg-neutral-900" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
      </div>
    </div>
  );
}

function CulturalTimeline({ accent = '#8c3c3c' }) {
  const items = [
    { title: 'Welcome Ceremony', desc: 'Begin with cleansing smoke and acknowledgment of Country.' },
    { title: 'Sacred Sites', desc: 'Explore land connections and cultural protocols.' },
    { title: 'Living Art', desc: 'Experience art, story, and artist voices.' },
  ];
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neutral-300 to-transparent" />
      <ul className="space-y-6">
        {items.map((it, i) => (
          <motion.li key={it.title} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="relative pl-12 md:pl-16">
            <span className="absolute left-3 md:left-7 top-2 w-3 h-3 rounded-full" style={{ backgroundColor: accent }} />
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
              <p className="font-medium">{it.title}</p>
              <p className="text-sm text-neutral-600 mt-1">{it.desc}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function CulturalWelcome({ onComplete }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Cultural welcome ceremony"
      role="dialog"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 60%, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white/95 backdrop-blur rounded-2xl p-8 max-w-md mx-auto text-center shadow-2xl border border-neutral-200"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 ring-8 ring-amber-100 shadow-lg"
        />
        <h2 className="mt-6 text-2xl font-semibold">Welcome</h2>
        <p className="mt-2 text-neutral-600">We begin with respect for Elders past and present, acknowledging Country and the cultural custodians of the lands.</p>
        <motion.button
          onClick={onComplete}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-neutral-900 text-white px-5 py-2 text-sm hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Enter
        </motion.button>
        <SmokeCanvas onFinished={onComplete} />
      </motion.div>
    </motion.div>
  );
}

function SmokeCanvas({ onFinished }) {
  useEffect(() => {
    const t = setTimeout(() => onFinished?.(), 3400);
    return () => clearTimeout(t);
  }, [onFinished]);
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 3.2, ease: 'easeOut', delay: 0.6 }}
      style={{ background: 'radial-gradient(circle at 50% 70%, rgba(0,0,0,0.2), transparent 60%)' }}
    >
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 bg-[radial-gradient(circle,rgba(0,0,0,0.18),transparent_60%)] rounded-full"
            initial={{ x: Math.random() * 400 - 200, y: 120, opacity: 0.5, scale: 0.8 }}
            animate={{ x: (Math.random() * 400 - 200) * 0.6, y: -140 - Math.random() * 40, opacity: 0, scale: 1.2 }}
            transition={{ duration: 3.2, ease: 'easeOut', delay: i * 0.06 }}
            style={{ left: '50%', top: '60%' }}
          />
        ))}
      </div>
    </motion.div>
  );
}
