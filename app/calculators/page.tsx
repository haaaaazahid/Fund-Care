import Calculators from '@/components/Calculators';

export const metadata = { title: 'Financial Calculators — Fund Care' };

export default function CalculatorsPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-[var(--line)]">
        <div className="wrap">
          <div className="section-kicker">Tools</div>
          <h1 className="text-[clamp(30px,4vw,44px)] text-navy dark:text-ink font-serif">Calculators that do real work.</h1>
          <p className="text-muted max-w-[560px] mt-3.5">
            Every calculator below runs standard financial formulas live in your browser as you move the sliders. Nothing is sent to a server, and no result is a guarantee of future performance.
          </p>
        </div>
      </section>
      <section className="pt-14 pb-20">
        <div className="wrap">
          <Calculators />
        </div>
      </section>
    </>
  );
}
