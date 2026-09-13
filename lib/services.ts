export interface Service {
  slug: string;
  name: string;
  description: string;
  problem: string;
  process: string[];
}

export const services: Service[] = [
  {
    slug: 'investment-planning',
    name: 'Investment Planning',
    description: 'Structured allocation aligned to your time horizon and risk comfort.',
    problem: "Money sitting in a savings account loses purchasing power to inflation every year it isn't put to work.",
    process: [
      'Understand your goals, timeline, and risk comfort',
      'Design an asset allocation across equity, debt, and gold',
      'Select instruments that match the allocation',
      'Review and rebalance on a regular schedule',
    ],
  },
  {
    slug: 'mutual-fund-planning',
    name: 'Mutual Fund Planning',
    description: 'Fund selection and SIP strategy built around your actual goals.',
    problem: 'There are thousands of mutual fund schemes — picking without a framework usually means picking on past returns alone.',
    process: [
      'Map your goals to fund categories',
      'Shortlist funds on process, not just past performance',
      'Set up SIP or lumpsum deployment',
      "Track and switch only when the fund's mandate changes",
    ],
  },
  {
    slug: 'retirement-planning',
    name: 'Retirement Planning',
    description: 'Model your retirement corpus and the monthly investment it needs.',
    problem: 'Most people underestimate how large a retirement corpus needs to be once inflation is accounted for over 20–30 years.',
    process: [
      'Estimate post-retirement monthly expenses in today\'s terms',
      'Project the corpus required at retirement age',
      'Work backward to a monthly investment figure',
      'Revisit the plan every few years as income changes',
    ],
  },
  {
    slug: 'insurance-planning',
    name: 'Insurance Planning',
    description: "Life, health, and general cover sized to protect what you've built.",
    problem: 'Being under-insured or over-insured are both costly — the right cover depends on income, dependents, and existing liabilities.',
    process: [
      'Calculate a life cover figure using the income-replacement method',
      'Review existing health cover against likely medical inflation',
      'Identify gaps versus employer-provided cover',
      'Recommend term and health policies matched to the gap',
    ],
  },
  {
    slug: 'tax-planning',
    name: 'Tax Planning',
    description: 'Plan investments and deductions ahead of the year, not after it.',
    problem: 'Tax-saving decisions made in March are usually rushed and rarely optimal.',
    process: [
      'Review your tax regime choice each year',
      'Plan 80C, 80D, and other eligible investments from April',
      'Align tax-saving instruments with your existing goals',
      'Avoid buying insurance purely for a tax deduction',
    ],
  },
  {
    slug: 'estate-planning',
    name: 'Estate Planning',
    description: 'A clear plan for how your assets pass on, on your terms.',
    problem: 'Without a will or nomination structure in place, assets can take years to pass to the people you intend.',
    process: [
      'Take stock of all assets, accounts, and nominees',
      'Draft or review a will with a qualified legal professional',
      'Set up nominations consistently across accounts',
      'Revisit after major life events — marriage, children, property',
    ],
  },
  {
    slug: 'wealth-management',
    name: 'Wealth Management',
    description: 'Comprehensive, ongoing strategy for long-term wealth.',
    problem: "As wealth grows, the questions shift from 'how do I save' to 'how do I structure, protect, and pass this on efficiently'.",
    process: [
      'Consolidate a full picture of assets and liabilities',
      'Build a long-term allocation across asset classes',
      'Coordinate tax, insurance, and estate planning together',
      'Review quarterly against goals, not against the market',
    ],
  },
  {
    slug: 'goal-planning',
    name: 'Goal Planning',
    description: 'Planning for important financial milestones.',
    problem: "A goal without a number and a date attached usually stays a wish rather than a plan.",
    process: [
      "Name the goal and the year it's needed by",
      "Calculate today's cost and the future cost after inflation",
      "Choose instruments matched to the goal's time horizon",
      'Track progress against the goal specifically, not the whole portfolio',
    ],
  },
];
