import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const articles = {
  'saving-more-isnt-a-plan': {
    title: "Why 'saving more' isn't a plan",
    intro: 'Saving money is important, but simply deciding to save more does not tell you what the money is for, how much you need, or whether your current behaviour can realistically get you there.',
    sections: [
      ['Saving is a behaviour; a plan is a destination', 'A savings target becomes meaningful when it is connected to a purpose and a deadline. “I want to save more” is difficult to measure because there is no defined finish line. Saving ₹5,000 a month may be excellent for one person and completely inadequate for another. The right question is not only how much you can save, but what the money needs to accomplish.', 'Start by naming the goal: an emergency reserve, a home, education, a wedding, financial independence, or another specific objective. Then attach a target amount and a date. Once those three pieces exist, you can work backwards to determine the monthly contribution required.'],
      ['Build an emergency fund before chasing long-term returns', 'An emergency fund is designed for accessibility and stability rather than maximum investment return. Its job is to prevent an unexpected medical expense, job interruption, repair or family emergency from forcing you to sell long-term investments at the wrong time or take expensive debt.', 'A practical target depends on income stability, dependants and recurring obligations. Someone with a highly variable income may need a larger cash buffer than someone with very stable income. The important principle is separation: money needed soon should not be treated exactly like money that can remain invested for many years.'],
      ['Automate the decision', 'Good financial habits should require as little willpower as possible. If you wait until the end of every month to decide what remains available for saving, spending usually expands to consume the available amount.', 'Instead, treat saving like a scheduled commitment. Set an automatic transfer or investment shortly after income arrives. Review the amount periodically as income and responsibilities change. Automation does not make a bad budget good, but it makes a sensible plan much easier to follow consistently.'],
      ['Increase savings when your income increases', 'One of the simplest ways to improve a financial plan is to prevent every salary increase from becoming lifestyle inflation. When income rises, consider directing a portion of the increase toward your existing goals before increasing discretionary spending.', 'This is more sustainable than trying to make an extreme cut to your lifestyle overnight. A plan that you can follow for years is generally more useful than an aggressive plan that lasts for only a few months.'],
      ['Give every goal its own timeline', 'Different goals should not automatically use the same investment approach. A goal that is only a year or two away has a very different time horizon from retirement decades in the future.', 'The closer the deadline, the less room there usually is to recover from a major market decline. Long-term goals can tolerate more volatility because there is more time for the investment strategy to work through different market conditions. The exact allocation should depend on the individual circumstances and risk capacity.'],
      ['Review the plan instead of abandoning it', 'A financial plan is not something you create once and never touch. Income, expenses, family responsibilities, goals and market conditions change. A useful review asks whether the target is still relevant, whether contributions are still affordable, whether protection is adequate and whether the investment strategy still matches the timeline.', 'The goal is not to predict every future event. It is to create a system that can adapt when life changes.'],
    ],
  },
  'cost-of-waiting-to-start-a-sip': {
    title: 'The real cost of waiting one more year to start a SIP',
    intro: 'The most powerful part of compounding is not a clever market prediction. It is time. Delaying an investment by one year can reduce the amount of time your earlier contributions have to grow.',
    sections: [
      ['What a SIP actually does', 'A Systematic Investment Plan, or SIP, is a method of investing a fixed amount at regular intervals. The contribution is made according to a schedule rather than relying on a single decision about when to invest a large amount.', 'A SIP does not guarantee returns and it does not remove investment risk. Its main behavioural advantage is consistency: you establish a recurring contribution and continue investing through different market conditions.'],
      ['Why time matters', 'Suppose two investors eventually contribute similar amounts, but one begins earlier. The earlier investor gives the first contributions more time to potentially compound. Returns earned in one period can themselves contribute to future returns, creating a snowball effect over long periods.', 'The difference becomes much more noticeable over decades than over a few months. This is why starting with a manageable amount can be more useful than waiting indefinitely for the “perfect” time or the perfect income level.'],
      ['An illustrative example', 'Imagine an investor contributes ₹5,000 every month for 20 years and, purely for illustration, earns an average annual return of 10%. The future value would be roughly ₹38 lakh, depending on the exact timing convention used. If the same investor waits one year and contributes for 19 years, the value would be materially lower.', 'These figures are illustrations, not promises. Actual market returns vary, fees and taxes may apply, and investment outcomes can be significantly different. The lesson is the relationship between contribution time and compounding, not a prediction of a particular return.'],
      ['Do not let the mathematics create bad behaviour', 'The answer to a missed year is not to take excessive risk to “catch up.” Increasing risk because a goal is behind schedule can make the situation worse if markets fall.', 'A better response is to revisit the target, contribution amount, timeline and expected return assumptions. If income has increased, a gradual SIP increase can help. If the goal date is flexible, extending the timeline may also be more realistic.'],
      ['Consistency beats waiting for certainty', 'Markets are uncertain. Your personal savings process does not have to be. If the goal, emergency reserves, insurance and risk tolerance are appropriate, a disciplined investment schedule can reduce the temptation to constantly wait for a better entry point.', 'Before starting any investment, understand the product, costs, risks, liquidity and whether it actually matches the goal.'],
    ],
  },
  'term-insurance-vs-investment-linked-insurance': {
    title: 'Term insurance vs. investment-linked insurance',
    intro: 'Insurance exists primarily to manage financial risk. Investments exist primarily to build wealth. Confusing those two jobs can make financial decisions harder than they need to be.',
    sections: [
      ['What term insurance is designed to do', 'A term insurance policy generally provides a death benefit for the policy term in exchange for a premium. Its core purpose is income and financial protection for the people who depend on the insured person.', 'For a family that relies heavily on one person’s income, adequate life cover can protect future obligations such as household expenses, education and outstanding liabilities. The appropriate cover depends on the family’s actual financial situation.'],
      ['What investment-linked products try to combine', 'Some insurance products combine insurance with an investment or savings component. They can have specific structures, costs, guarantees and conditions, so they should not be evaluated only by looking at an advertised return or maturity value.', 'The important comparison is not simply “which gives a higher number?” Consider the protection provided, charges, liquidity, guarantees, investment risk, tax treatment and whether the product fits the goal.'],
      ['Why separating the decisions can be clearer', 'When insurance and investing are considered separately, each decision can be judged against its own objective. You can ask how much protection the family needs and separately decide how much money should be invested for long-term goals.', 'This can make costs and trade-offs easier to see. It also avoids treating an investment return as if it were a substitute for adequate protection.'],
      ['Questions to ask before buying', 'Ask what the policy guarantees, what is not guaranteed, how premiums change, what happens if payments stop, what surrender or withdrawal rules apply, what charges are deducted, and how the product performs under different scenarios.', 'Do not buy a financial product solely because of a tax benefit, a sales illustration or a promise of superior returns. Read the policy documents and understand the exclusions and conditions.'],
      ['Protection comes first when dependants are involved', 'If someone’s income is essential to the household, the financial impact of their death can be much larger than the value of an investment account. That makes risk protection a separate and important part of financial planning.', 'The right amount of insurance is personal. It should reflect liabilities, dependants, existing assets, future obligations and the family’s ability to continue without the insured income.'],
    ],
  },
} as const;

type Slug = keyof typeof articles;

type Article = (typeof articles)[Slug];

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = articles[params.slug as Slug];
  if (!article) return { title: 'Insight not found — Fund Care' };
  return {
    title: `${article.title} — Fund Care`,
    description: article.intro,
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article: Article | undefined = articles[params.slug as Slug];
  if (!article) notFound();

  return (
    <main>
      <article className="pt-16 pb-20">
        <div className="wrap max-w-[820px]">
          <Link href="/insights" className="text-[13px] text-gold-dark dark:text-gold hover:underline">
            ← Back to insights
          </Link>

          <div className="section-kicker mt-10">Financial insight</div>
          <h1 className="text-[clamp(34px,5vw,56px)] leading-[1.08] text-navy dark:text-ink font-serif">
            {article.title}
          </h1>
          <p className="mt-6 text-[18px] leading-8 text-muted max-w-[760px]">{article.intro}</p>

          <div className="mt-12 border-t border-[var(--line)] pt-10 space-y-11">
            {article.sections.map(([heading, first, second]) => (
              <section key={heading}>
                <h2 className="text-[25px] leading-tight text-navy dark:text-ink font-serif mb-4">{heading}</h2>
                <p className="text-[16px] leading-8 text-muted mb-4">{first}</p>
                <p className="text-[16px] leading-8 text-muted">{second}</p>
              </section>
            ))}
          </div>

          <div className="mt-14 border border-[var(--line)] bg-[var(--surface)] p-7">
            <div className="section-kicker">A useful reminder</div>
            <p className="text-sm leading-7 text-muted">
              These articles are educational and general in nature. They are not personalised investment, insurance, tax or legal advice. Your circumstances, goals, time horizon and risk tolerance should be considered before making a financial decision.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
