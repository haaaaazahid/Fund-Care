export const metadata = { title: 'Insights — Fund Care' };

const posts = [
  ["Why 'saving more' isn't a plan", "A number without a date attached rarely becomes a habit. Here's how to turn a savings intention into a plan."],
  ['The real cost of waiting one more year to start a SIP', 'A look at how a one-year delay compounds over a 20-year investment horizon.'],
  ['Term insurance vs. investment-linked insurance', 'Why most planners recommend keeping insurance and investment as two separate decisions.'],
];

export default function InsightsPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-[var(--line)]">
        <div className="wrap">
          <div className="section-kicker">Insights</div>
          <h1 className="text-[clamp(30px,4vw,44px)] text-navy dark:text-ink font-serif">Notes on planning, not predictions on markets.</h1>
          <p className="text-muted max-w-[560px] mt-3.5">
            Sample articles for this template — connect the CMS described in the backend scaffold to publish real posts with categories, tags, and SEO fields.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="wrap grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)]">
          {posts.map(([title, desc]) => (
            <div key={title} className="bg-[var(--bg)] p-8">
              <div className="font-serif text-xs text-gold-dark dark:text-gold mb-4">Insight</div>
              <h3 className="text-[19px] text-navy dark:text-ink mb-2.5 font-medium">{title}</h3>
              <p className="text-sm text-muted mb-4">{desc}</p>
              <a href="#" className="text-[13px] text-gold-dark dark:text-gold">Read article →</a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
