import { Reveal } from '@/components/HomeSections';

export const metadata = { title: 'About — Fund Care' };

const points = [
  ['Transparent process', 'Every recommendation is tied to a documented goal, with the reasoning shown, not just the product.'],
  ['Goal-based planning', 'Plans are built around your goals and timeline — not a single product being sold.'],
  ['Regular reviews', 'Markets and life circumstances change; plans are meant to be revisited, not filed away.'],
  ['Clear disclaimers', 'Illustrative figures are always labelled as such. Past performance is never presented as a guarantee.'],
  ['Privacy & security', 'Personal and financial information is handled under standard data-protection practice.'],
  ['Regulatory information', 'Certifications, registrations, and AUM figures are intentionally left blank on this template until verified information is supplied.'],
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-[var(--line)]">
        <div className="wrap">
          <div className="section-kicker">About</div>
          <h1 className="text-[clamp(30px,4vw,44px)] text-navy dark:text-ink font-serif">A calmer way to plan money.</h1>
          <p className="text-muted max-w-[560px] mt-3.5">
            Fund Care exists to bring structure to financial decisions that are usually made in a hurry — replacing guesswork with a documented, goal-based plan.
          </p>
        </div>
      </section>
      <section id="experience" className="py-16">
        <div className="wrap">
          <Reveal className="max-w-[600px] mb-14">
            <div className="section-kicker">How we work</div>
            <h2 className="text-[clamp(28px,3.4vw,38px)] text-navy dark:text-ink font-serif">Transparent, goal-based, and reviewed regularly.</h2>
            <p className="text-muted mt-3.5">No claim on this page is a substitute for reading the actual disclosures a client agreement would include.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)]">
            {points.map(([title, desc]) => (
              <div key={title} className="bg-[var(--bg)] p-8">
                <h3 className="text-navy dark:text-ink text-lg mb-2.5 font-serif">{title}</h3>
                <p className="text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
