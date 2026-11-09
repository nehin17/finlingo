import { api } from './api.js'
import { MOCK_COMPANY_RESEARCH, MOCK_SEARCH_RESULTS } from '../components/research/researchMockData.js'

const USE_MOCKS = true

export async function searchCompanies(query = '') {
  if (USE_MOCKS) {
    if (!query.trim()) return MOCK_SEARCH_RESULTS

    const q = query.toLowerCase()

    return MOCK_SEARCH_RESULTS.filter((company) =>
      company.ticker.toLowerCase().includes(q) ||
      company.name.toLowerCase().includes(q)
    )
  }

  return api.companies.search(query)
}

export async function fetchCompanyResearch(ticker) {
  if (USE_MOCKS) {
    return {
      ...MOCK_COMPANY_RESEARCH,
      company: {
        ...MOCK_COMPANY_RESEARCH.company,
        ticker,
      },
    }
  }

  return api.companies.getResearchByTicker(ticker)
}