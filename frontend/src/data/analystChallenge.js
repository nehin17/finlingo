
// backend/data/analystChallenges.js

/*
 * Analyst Challenge Question Bank
 *
 * IMPORTANT:
 * - This file contains the challenge content and scoring framework.
 * - Expert answers and scoring criteria stay on the backend.
 * - Do NOT send the complete objects from this file to the frontend.
 * - The frontend should only receive the public question data.
 */

export const analystChallenges = [
  {
    id: 'challenge-001',
    questionNumber: 1,

    difficulty: 'Beginner',

    category: 'Business Quality',

    question:
      'Which company appears to have the stronger long-term economics, Company A or Company B?',

    instructions:
      'Analyze the financial metrics below and explain your conclusion in 2–3 sentences. Use specific numbers from the table to support your reasoning. Consider growth, profitability, cash generation, and financial flexibility.',

    metrics: [
      {
        metric: 'Revenue Growth',
        companyA: '18%',
        companyB: '7%',
      },
      {
        metric: 'Gross Margin',
        companyA: '62%',
        companyB: '41%',
      },
      {
        metric: 'Free Cash Flow Margin',
        companyA: '22%',
        companyB: '14%',
      },
      {
        metric: 'Debt-to-Equity',
        companyA: '0.3x',
        companyB: '1.2x',
      },
    ],

    /*
     * This information should NEVER be exposed to the frontend
     * before the user submits their answer.
     */

    expertAnalysis:
      "Company A demonstrates stronger long-term economics. Its 18% revenue growth is significantly higher than Company B's 7%, while its 62% gross margin and 22% free cash flow margin indicate stronger pricing power and cash-generation efficiency. Company A also has substantially lower leverage at 0.3x debt-to-equity versus 1.2x, giving it greater financial flexibility and lower balance-sheet risk.",

    keyTakeaways: [
      'Higher revenue growth can indicate stronger demand and expansion potential.',
      'Gross margin can provide insight into pricing power and underlying unit economics.',
      'Free cash flow margin shows how effectively revenue is converted into discretionary cash.',
      'Lower leverage generally provides greater financial flexibility and downside protection.',
    ],

    scoringCriteria: {
      conclusion: {
        maxScore: 20,
        description:
          'Correctly identifies Company A as having stronger overall long-term economics.',
      },

      quantitativeEvidence: {
        maxScore: 25,
        description:
          'Uses specific metrics and numerical differences from the table to support the conclusion.',
      },

      profitability: {
        maxScore: 20,
        description:
          'Correctly interprets the gross margin and free cash flow margin differences.',
      },

      financialFlexibility: {
        maxScore: 20,
        description:
          'Correctly interprets the debt-to-equity difference and its implications for financial risk and flexibility.',
      },

      reasoningQuality: {
        maxScore: 15,
        description:
          'Provides a clear, concise, logically connected financial argument rather than simply listing metrics.',
      },
    },

    totalScore: 100,
  },

  {
    id: 'challenge-002',
    questionNumber: 2,

    difficulty: 'Beginner',

    category: 'Profitability Analysis',

    question:
      'Company A has higher revenue growth, but Company B has significantly higher operating margins. Which company currently demonstrates stronger operating economics?',

    instructions:
      'Compare the companies using the metrics below. Explain your conclusion in 2–3 sentences and identify the trade-off between growth and profitability.',

    metrics: [
      {
        metric: 'Revenue Growth',
        companyA: '28%',
        companyB: '11%',
      },
      {
        metric: 'Gross Margin',
        companyA: '38%',
        companyB: '64%',
      },
      {
        metric: 'Operating Margin',
        companyA: '8%',
        companyB: '27%',
      },
      {
        metric: 'Free Cash Flow Margin',
        companyA: '5%',
        companyB: '19%',
      },
    ],

    expertAnalysis:
      'Company B currently demonstrates stronger operating economics despite Company A growing faster. Company B generates substantially higher gross and operating margins and converts a larger portion of revenue into free cash flow. Company A has greater growth momentum, but its lower margins suggest that its growth is currently less profitable.',

    keyTakeaways: [
      'High revenue growth does not automatically imply superior economics.',
      'Operating margin measures how much operating profit remains after operating expenses.',
      'Free cash flow margin helps determine whether accounting profitability translates into cash generation.',
      'Analysts should evaluate growth and profitability together rather than relying on one metric.',
    ],

    scoringCriteria: {
      conclusion: {
        maxScore: 20,
        description:
          'Identifies Company B as having stronger current operating economics while acknowledging Company A has stronger growth.',
      },

      quantitativeEvidence: {
        maxScore: 25,
        description:
          'Uses the growth, gross margin, operating margin, and/or free cash flow figures as evidence.',
      },

      profitability: {
        maxScore: 25,
        description:
          'Correctly explains why Company B has stronger profitability despite slower growth.',
      },

      tradeoffAnalysis: {
        maxScore: 15,
        description:
          'Recognizes the trade-off between growth and profitability.',
      },

      reasoningQuality: {
        maxScore: 15,
        description:
          'Clearly connects the metrics to the conclusion rather than simply repeating the numbers.',
      },
    },

    totalScore: 100,
  },

  {
    id: 'challenge-003',
    questionNumber: 3,

    difficulty: 'Intermediate',

    category: 'Capital Efficiency',

    question:
      'Company A has a lower ROE than Company B. Does that automatically mean Company B is the better business? Analyze the data before reaching a conclusion.',

    instructions:
      'Explain in 2–3 sentences whether the higher ROE necessarily indicates superior business quality. Pay particular attention to leverage and operating profitability.',

    metrics: [
      {
        metric: 'Revenue Growth',
        companyA: '14%',
        companyB: '12%',
      },
      {
        metric: 'Operating Margin',
        companyA: '24%',
        companyB: '18%',
      },
      {
        metric: 'ROE',
        companyA: '22%',
        companyB: '38%',
      },
      {
        metric: 'Debt-to-Equity',
        companyA: '0.2x',
        companyB: '2.1x',
      },
    ],

    expertAnalysis:
      "Company B's higher ROE does not automatically make it the better business. Its 38% ROE is accompanied by substantially higher leverage at 2.1x debt-to-equity, which can mechanically amplify returns to equity holders while also increasing financial risk. Company A has a lower ROE but stronger operating margins, slightly higher growth, and a much stronger balance sheet.",

    keyTakeaways: [
      'ROE should not be analyzed in isolation.',
      'High leverage can amplify ROE.',
      'A high ROE can result from strong economics, high leverage, or both.',
      'Analysts should examine operating margins and balance-sheet structure alongside ROE.',
    ],

    scoringCriteria: {
      conclusion: {
        maxScore: 20,
        description:
          'Correctly explains that higher ROE does not automatically mean Company B is the better business.',
      },

      roeInterpretation: {
        maxScore: 25,
        description:
          'Recognizes that leverage can materially increase ROE.',
      },

      quantitativeEvidence: {
        maxScore: 20,
        description:
          'Uses the ROE and debt-to-equity figures to support the argument.',
      },

      businessQuality: {
        maxScore: 20,
        description:
          'Considers operating margin, growth, and balance-sheet quality rather than focusing exclusively on ROE.',
      },

      reasoningQuality: {
        maxScore: 15,
        description:
          'Demonstrates nuanced financial reasoning and avoids treating one metric as definitive.',
      },
    },

    totalScore: 100,
  },

  {
    id: 'challenge-004',
    questionNumber: 4,

    difficulty: 'Intermediate',

    category: 'Cash Flow Analysis',

    question:
      'Company A reports substantially higher net income than Company B, but Company B generates significantly more free cash flow. Which company would you investigate further as a potential investment and why?',

    instructions:
      'Analyze the relationship between accounting profit and cash generation. Explain your conclusion in 2–3 sentences using the supplied figures.',

    metrics: [
      {
        metric: 'Net Income',
        companyA: '₹1,200 Cr',
        companyB: '₹850 Cr',
      },
      {
        metric: 'Operating Cash Flow',
        companyA: '₹900 Cr',
        companyB: '₹1,300 Cr',
      },
      {
        metric: 'Capital Expenditures',
        companyA: '₹700 Cr',
        companyB: '₹300 Cr',
      },
      {
        metric: 'Free Cash Flow',
        companyA: '₹200 Cr',
        companyB: '₹1,000 Cr',
      },
    ],

    expertAnalysis:
      "Company B deserves further investigation because it converts a lower level of accounting profit into substantially more free cash flow. Company A's ₹1,200 Cr net income falls to only ₹200 Cr of free cash flow after capital expenditures, whereas Company B generates ₹1,000 Cr of free cash flow. An analyst should investigate the reasons behind Company A's heavy capital expenditure requirements and determine whether those investments are likely to generate attractive future returns.",

    keyTakeaways: [
      'Net income and free cash flow measure different aspects of financial performance.',
      'Capital expenditure can create a large difference between accounting profit and free cash flow.',
      'High capital intensity is not automatically negative if investments generate attractive returns.',
      'Analysts should investigate why cash conversion differs between companies.',
    ],

    scoringCriteria: {
      conclusion: {
        maxScore: 20,
        description:
          'Identifies Company B as the company deserving further investigation based on stronger free cash flow.',
      },

      cashFlowUnderstanding: {
        maxScore: 25,
        description:
          'Correctly distinguishes net income from operating cash flow and free cash flow.',
      },

      quantitativeEvidence: {
        maxScore: 20,
        description:
          'Uses the supplied net income, operating cash flow, capital expenditure, and free cash flow figures.',
      },

      capitalIntensity: {
        maxScore: 20,
        description:
          'Recognizes that Company A requires significantly more capital expenditure and that the reason for this should be investigated.',
      },

      reasoningQuality: {
        maxScore: 15,
        description:
          'Provides a nuanced conclusion rather than assuming higher net income automatically means a better business.',
      },
    },

    totalScore: 100,
  },

  {
    id: 'challenge-005',
    questionNumber: 5,

    difficulty: 'Intermediate',

    category: 'Valuation',

    question:
      'Company A trades at a substantially higher P/E multiple than Company B. Based on the information below, is the premium valuation potentially justified?',

    instructions:
      'Evaluate whether Company A deserves a higher valuation multiple. Use growth, margins, and balance-sheet strength to support your answer in 2–3 sentences.',

    metrics: [
      {
        metric: 'P/E Ratio',
        companyA: '32x',
        companyB: '15x',
      },
      {
        metric: 'Revenue Growth',
        companyA: '24%',
        companyB: '9%',
      },
      {
        metric: 'Operating Margin',
        companyA: '29%',
        companyB: '17%',
      },
      {
        metric: 'Debt-to-Equity',
        companyA: '0.1x',
        companyB: '1.4x',
      },
    ],

    expertAnalysis:
      "Company A's 32x P/E premium may be justified by its significantly stronger growth, higher operating margin, and much lower leverage. However, a higher-quality business is not automatically a better investment because the price paid matters. An analyst should determine whether the additional growth and profitability are sufficient to justify paying more than twice Company B's earnings multiple.",

    keyTakeaways: [
      'A higher P/E can reflect higher expected growth or business quality.',
      'Valuation must be considered relative to expected future earnings growth.',
      'A strong company can still be an unattractive investment if its valuation is excessive.',
      'Balance-sheet quality can influence the valuation multiple investors are willing to pay.',
    ],

    scoringCriteria: {
      conclusion: {
        maxScore: 20,
        description:
          'Recognizes that Company A may deserve a premium valuation but that the premium must still be justified by future performance.',
      },

      valuationUnderstanding: {
        maxScore: 25,
        description:
          'Demonstrates an understanding that valuation depends on expectations for future earnings and business quality.',
      },

      quantitativeEvidence: {
        maxScore: 20,
        description:
          'Uses the P/E, growth, operating margin, and/or leverage figures.',
      },

      riskAwareness: {
        maxScore: 20,
        description:
          'Recognizes that a higher-quality company is not necessarily a better investment at any price.',
      },

      reasoningQuality: {
        maxScore: 15,
        description:
          'Provides a balanced valuation argument rather than simply stating that the higher-growth company deserves a higher P/E.',
      },
    },

    totalScore: 100,
  },

  {
    id: 'challenge-006',
    questionNumber: 6,

    difficulty: 'Advanced',

    category: 'Growth Quality',

    question:
      'Company A is growing significantly faster than Company B, but its incremental growth comes with sharply declining margins. Should an analyst automatically prefer Company A?',

    instructions:
      'Evaluate the quality and sustainability of growth. Explain your reasoning in 2–3 sentences and distinguish revenue growth from profitable growth.',

    metrics: [
      {
        metric: 'Revenue Growth',
        companyA: '35%',
        companyB: '12%',
      },
      {
        metric: 'Gross Margin',
        companyA: '48%',
        companyB: '61%',
      },
      {
        metric: 'Operating Margin',
        companyA: '6%',
        companyB: '23%',
      },
      {
        metric: 'Free Cash Flow Margin',
        companyA: '2%',
        companyB: '18%',
      },
      {
        metric: 'Debt-to-Equity',
        companyA: '1.6x',
        companyB: '0.3x',
      },
    ],

    expertAnalysis:
      "An analyst should not automatically prefer Company A despite its 35% growth rate. Company A's rapid growth is accompanied by substantially weaker gross and operating margins, very low free cash flow generation, and higher leverage. The key question is whether Company A can eventually convert its growth into stronger margins and cash generation without requiring excessive additional capital.",

    keyTakeaways: [
      'Revenue growth should be evaluated alongside profitability and cash generation.',
      'Rapid growth can destroy value if incremental revenue produces inadequate returns.',
      "Margin trends are often more informative than a single period's margin.",
      'High leverage increases the risk associated with an aggressive growth strategy.',
    ],

    scoringCriteria: {
      conclusion: {
        maxScore: 20,
        description:
          'Recognizes that Company A should not automatically be preferred despite much faster growth.',
      },

      growthQuality: {
        maxScore: 25,
        description:
          'Distinguishes high revenue growth from high-quality, profitable, sustainable growth.',
      },

      quantitativeEvidence: {
        maxScore: 20,
        description:
          'Uses the supplied margin, cash flow, growth, and leverage data.',
      },

      financialRisk: {
        maxScore: 20,
        description:
          'Recognizes that Company A combines weak cash generation with higher leverage, increasing financial risk.',
      },

      reasoningQuality: {
        maxScore: 15,
        description:
          'Demonstrates forward-looking thinking about whether current growth can eventually produce attractive economics.',
      },
    },

    totalScore: 100,
  },
]

/*
 * Helper used by the backend to expose ONLY the information
 * the frontend needs before the user submits an answer.
 *
 * This prevents expertAnalysis and scoringCriteria from being
 * accidentally exposed to the client.
 */

export function getPublicChallenge(challenge) {
  return {
    id: challenge.id,
    questionNumber: challenge.questionNumber,
    difficulty: challenge.difficulty,
    category: challenge.category,
    question: challenge.question,
    instructions: challenge.instructions,
    metrics: challenge.metrics,
  }
}

/*
 * Helper used by the backend when evaluating an answer.
 */

export function getChallengeForEvaluation(challengeId) {
  return analystChallenges.find(
    (challenge) => challenge.id === challengeId
  )
}

