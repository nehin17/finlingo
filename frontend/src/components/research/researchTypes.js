// src/components/research/researchTypes.js
//
// Centralized type contracts for the FinLingo Research Workspace.
// These are JSDoc typedefs only — they do NOT contain any hardcoded data.
// Every research component should use these shapes so the UI remains fully API-ready.

/**
 * ============================================================
 * COMPANY IDENTITY
 * ============================================================
 */

/**
 * @typedef {Object} ResearchCompanyIdentity
 * @property {string} ticker
 * @property {string} name
 * @property {string} exchange
 * @property {string} sector
 * @property {string} country
 * @property {string|null} logoUrl
 * @property {number} price
 * @property {number} change
 * @property {number} changeAmount
 * @property {{ label: string, updated: string, timezone: string }} status
 */

/**
 * ============================================================
 * INVESTMENT SNAPSHOT
 * ============================================================
 */

/**
 * @typedef {Object} SnapshotMetric
 * @property {string} label
 * @property {string} value
 * @property {string=} sub
 * @property {'up'|'down'|'flat'=} tone
 */

/**
 * ============================================================
 * BUSINESS OVERVIEW
 * ============================================================
 */

/**
 * @typedef {Object} RevenueSegment
 * @property {string} label
 * @property {number} share
 */

/**
 * @typedef {Object} BusinessOverview
 * @property {number} founded
 * @property {string} headquarters
 * @property {string} ceo
 * @property {number} employees
 * @property {string} summary
 * @property {RevenueSegment[]} segments
 */

/**
 * ============================================================
 * PRICE CHART
 * ============================================================
 */

/**
 * @typedef {Object} ChartPoint
 * @property {number} timestamp
 * @property {number} price
 */

/**
 * Multiple time ranges supported by the chart UI.
 *
 * @typedef {Object} ChartSeries
 * @property {ChartPoint[]=} 1D
 * @property {ChartPoint[]=} 1W
 * @property {ChartPoint[]=} 1M
 * @property {ChartPoint[]=} 3M
 * @property {ChartPoint[]=} 6M
 * @property {ChartPoint[]=} 1Y
 * @property {ChartPoint[]=} 5Y
 */

/**
 * ============================================================
 * FINANCIAL STATEMENTS
 * ============================================================
 */

/**
 * @typedef {Object} FinancialValue
 * @property {string} period
 * @property {number} value
 */

/**
 * @typedef {Object} FinancialRow
 * @property {string} label
 * @property {FinancialValue[]} values
 * @property {'currency'|'number'|'ratio'} format
 */

/**
 * @typedef {Object} FinancialStatements
 * @property {FinancialRow[]} income
 * @property {FinancialRow[]} balance
 * @property {FinancialRow[]} cashFlow
 * @property {string[]} periods
 */

/**
 * ============================================================
 * VALUATION
 * ============================================================
 */

/**
 * @typedef {Object} ValuationRow
 * @property {string} metric
 * @property {number|string} company
 * @property {number|string} industry
 * @property {'better'|'worse'|'neutral'=} tone
 */

/**
 * ============================================================
 * PROFITABILITY
 * ============================================================
 */

/**
 * @typedef {Object} ProfitabilityMetric
 * @property {string} label
 * @property {number} value
 * @property {number} benchmark
 * @property {string=} format
 */

/**
 * ============================================================
 * BALANCE SHEET HEALTH
 * ============================================================
 */

/**
 * @typedef {Object} BalanceSheetItem
 * @property {string} label
 * @property {string} value
 * @property {'good'|'warn'|'bad'|'neutral'} status
 * @property {string=} note
 */

/**
 * ============================================================
 * GROWTH TRENDS
 * ============================================================
 */

/**
 * @typedef {Object} GrowthPoint
 * @property {string} period
 * @property {number} value
 */

/**
 * @typedef {Object} GrowthSeries
 * @property {string} label
 * @property {GrowthPoint[]} data
 */

/**
 * ============================================================
 * COMPETITIVE POSITION
 * ============================================================
 */

/**
 * @typedef {Object} StrategicPoint
 * @property {string} title
 * @property {string} description
 */

/**
 * @typedef {Object} CompetitivePosition
 * @property {StrategicPoint[]} strengths
 * @property {StrategicPoint[]} risks
 */

/**
 * ============================================================
 * CATALYSTS
 * ============================================================
 */

/**
 * @typedef {Object} Catalyst
 * @property {string} date
 * @property {string} type
 * @property {string} title
 * @property {string} description
 * @property {'positive'|'negative'|'neutral'} impact
 */

/**
 * ============================================================
 * NEWS & FILINGS
 * ============================================================
 */

/**
 * @typedef {Object} ResearchNewsItem
 * @property {string} id
 * @property {string} source
 * @property {string} date
 * @property {string} headline
 * @property {string=} url
 */

/**
 * @typedef {Object} FilingLink
 * @property {string} label
 * @property {string=} url
 * @property {string=} period
 */

/**
 * ============================================================
 * PEER COMPARISON
 * ============================================================
 */

/**
 * @typedef {Object} PeerRow
 * @property {string} ticker
 * @property {string} name
 * @property {number} marketCap
 * @property {number} pe
 * @property {number} revenueGrowth
 * @property {number} operatingMargin
 */

/**
 * ============================================================
 * MAIN RESEARCH PAYLOAD
 * ============================================================
 * This is the single object that should power the entire
 * Research Workspace UI. The backend can progressively
 * populate sections without requiring frontend redesigns.
 */

/**
 * @typedef {Object} ResearchCompanyData
 * @property {ResearchCompanyIdentity} company
 * @property {SnapshotMetric[]} snapshot
 * @property {BusinessOverview} business
 * @property {ChartSeries} chart
 * @property {FinancialStatements} financials
 * @property {ValuationRow[]} valuation
 * @property {ProfitabilityMetric[]} profitability
 * @property {BalanceSheetItem[]} balanceSheet
 * @property {GrowthSeries[]} growth
 * @property {CompetitivePosition} competitivePosition
 * @property {Catalyst[]} catalysts
 * @property {ResearchNewsItem[]} news
 * @property {FilingLink[]} filings
 * @property {PeerRow[]} peers
 */

// This file intentionally exports nothing at runtime.
// It exists only for editor intelligence, documentation,
// and API contract consistency across the Research Workspace.

export {}