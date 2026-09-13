import Link from 'next/link';

export const metadata = { title: 'Insights — Fund Care' };

const posts = [
  {
    slug: 'saving-more-isnt-a-plan',
    title: "Why 'saving more' isn't a plan",
    desc: 'A number without a date attached rarely becomes a habit. Learn how to turn a vague savings intention into a practical financial plan.',
  },
  {
    slug: 'cost-of-waiting-to-start-a-sip',
    title: 'The real cost of waiting one more year to start a SIP',
    desc: 'A simple look at how time, monthly contributions, returns and compounding interact over a 20-year investment horizon.',
  },
  {
    slug: 'term-insurance-vs-investment-linked-insurance',
    title: 'Term insurance vs. investment-linked insurance',
    desc: 'Understand why insurance and investing solve different problems, and what to consider before choosing a policy.',
  },
];

export default function InsightsPage() {
  return (
    <>
      <section className="pt-16 pb-10 border-b border-[var(--line)]">
        <div className="wrap">
          <div className="section-kicker">Insights</div>
          <h1 className="text-[clamp(30px,4vw,44px)] text-navy dark:text-ink font-serif">
            Notes on planning, not predictions on markets.
          </h1>
          <p className="text-muted max-w-[620px] mt-3.5">
            Practical explainers designed to make important financial decisions easier to understand. No market predictions, no unnecessary jargon.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--line)]">
          {posts.map((post) => (
            <article key={post.slug} className="bg-[var(--bg)] p-8 flex flex-col">
              <div className="font-serif text-xs text-gold-dark dark:text-gold mb-4">Insight</div>
              <h2 className="text-[19px] text-navy dark:text-ink mb-2.5 font-medium">{post.title}</h2>
              <p className="text-sm text-muted mb-6 flex-1">{post.desc}</p>
              <Link
                href={`/insights/${post.slug}`}
                className="inline-flex w-fit text-[13px] text-gold-dark dark:text-gold hover:underline focus:outline-none focus:ring-2 focus:ring-gold/40"
              >
                Read full article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
