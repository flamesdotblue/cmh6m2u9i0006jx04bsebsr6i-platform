import { Sun, Mountain, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CulturalNavigation({ activePath, onNavigate, routes }) {
  const icons = {
    '/': Sun,
    '/heritage-sites': Mountain,
    '/art-gallery': Palette,
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-50/90 via-rose-50/90 to-emerald-50/90 backdrop-blur supports-[backdrop-filter]:backdrop-blur-md border-b border-neutral-200" />
        <nav className="relative max-w-6xl mx-auto px-4 py-3 flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-600/90 ring-2 ring-amber-200 shadow-md flex items-center justify-center">
              <span className="sr-only">Aboriginal Heritage</span>
              <div className="w-5 h-5 bg-[radial-gradient(circle_at_50%_50%,#fff8_0%,#ffffff00_60%)] rounded-full" />
            </div>
            <div className="leading-tight">
              <p className="font-semibold tracking-tight">Aboriginal Heritage</p>
              <p className="text-xs text-neutral-600">Cultural knowledge, respectfully shared</p>
            </div>
          </div>

          <div className="flex-1" />

          <ul className="flex items-center gap-1">
            {routes.map((r) => {
              const Icon = icons[r.path] ?? Sun;
              const isActive = activePath === r.path;
              return (
                <li key={r.path}>
                  <button
                    onClick={() => onNavigate(r.path)}
                    className={`group relative flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 ${
                      isActive ? 'bg-neutral-900 text-white' : 'text-neutral-800 hover:bg-neutral-800/5'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={r.label}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{r.label}</span>
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-neutral-900"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
