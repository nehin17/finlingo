// src/services/caseStudyService.js

const API_BASE_URL =
  import.meta.env.VITE_API_URL || ''

export async function getCaseStudies() {
  const response = await fetch(
    `${API_BASE_URL}/api/case-studies`
  )

  if (!response.ok) {
    throw new Error('Failed to fetch case studies')
  }

  return response.json()
}

export async function getCaseStudy(slug) {
  if (!slug) {
    throw new Error('Case study slug is required')
  }

  const response = await fetch(
    `${API_BASE_URL}/api/case-studies/${encodeURIComponent(slug)}`
  )

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('CASE_STUDY_NOT_FOUND')
    }

    throw new Error('Failed to fetch case study')
  }

  return response.json()
}