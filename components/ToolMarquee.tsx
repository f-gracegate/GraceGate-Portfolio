import { TRUSTED_BRANDS } from '@/lib/data';

export default function ToolMarquee() {
  const items = [...TRUSTED_BRANDS, ...TRUSTED_BRANDS];
  return (
    <section aria-label="Tools and platforms" className="relative border-y border-white/[0.06] bg-ink-900/40 py-7">
      <p className="sr-only">Tools and platforms: {TRUSTED_BRANDS.join(', ')}</p>
      <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]" aria-hidden>
        <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]">
          {items.map((b, i) => (
            <span
              key={i}
              className="flex items-center gap-14 whitespace-nowrap font-display text-lg font-medium tracking-tight text-white/35 transition-colors hover:text-white sm:text-xl"
            >
              {b}
              <span className="text-brand-500/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
