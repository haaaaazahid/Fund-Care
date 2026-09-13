import Link from 'next/link';
import Hero from '@/components/Hero';
import { ServicesGrid, Journey, StatsCounter, Reveal } from '@/components/HomeSections';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <div className="pt-20"><ServicesGrid /></div>
      <div className="pt-20"><Journey /></div>

      <section id="calculators" className="pt-20">
        <div className="wrap">
          <Reveal className="max-w-[600px] mb-8">
            <div className="section-kicker">Tools</div>
            <h2 className="text-[clamp(28px,3.4vw,38px)] text-navy dark:text-ink font-serif">Calculators that do real work.</h2>
            <p className="text-muted mt-3.5">Model outcomes before you commit. Every calculator uses standard financial formulas — illustrative only, not a guarantee of returns.</p>
          </Reveal>
          <div className="flex gap-3.5 flex-wrap">
            {[
              ['sip', 'SIP Calculator'], ['lumpsum', 'Lumpsum Calculator'], ['retirement', 'Retirement Calculator'],
              ['emi', 'EMI Calculator'], ['goal', 'Goal Planner'], ['ppf', 'PPF Calculator'],
            ].map(([slug, name]) => (
              <Link key={slug} href={`/calculators#${slug}`} className="border border-[var(--line)] bg-[var(--surface)] px-5 py-3.5 text-sm text-navy dark:text-ink flex items-center gap-2.5 hover:border-gold">
                <span className="font-serif text-base text-gold-dark dark:text-gold">₹</span> {name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="pt-20 pb-4">
        <div className="wrap">
          <Reveal className="max-w-[600px] mb-14">
            <div className="section-kicker">In their words</div>
            <h2 className="text-[clamp(28px,3.4vw,38px)] text-navy dark:text-ink font-serif">What clients say (sample).</h2>
            <p className="text-muted mt-3.5">Placeholder testimonials — replace with verified client quotes via Admin → Testimonials before launch.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)]">
            {[
              ["Fund Care helped us turn a vague idea of 'saving more' into an actual plan with numbers behind it.", 'Sample client, Pune'],
              ['The retirement calculator alone was worth the first conversation. Everything since has built on that.', 'Sample client, Mumbai'],
              ['No jargon, no pressure to buy anything on day one. Just a clear process.', 'Sample client, Thane'],
            ].map(([quote, author]) => (
              <div key={author} className="bg-[var(--bg)] p-8">
                <p className="italic text-muted mb-4">&ldquo;{quote}&rdquo;</p>
                <h3 className="text-[15px] text-navy dark:text-ink">— {author}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
