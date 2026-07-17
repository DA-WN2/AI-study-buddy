import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

// Hardcoded userId obtained from seeding script
export const USER_ID = '6a59ca097101e3dbfa2d443f'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = {
  // Research Results endpoints
  getResearchResults: async () => {
    const response = await apiClient.get('/api/research-results', {
      params: { userId: USER_ID }
    })
    return response.data
  },

  saveResearchResult: async (topic, content, deckId = null) => {
    const response = await apiClient.post('/api/research-results', {
      topic,
      content,
      userId: USER_ID,
      deckId
    })
    return response.data
  },

  getResearchResultById: async (id) => {
    const response = await apiClient.get(`/api/research-results/${id}`)
    return response.data
  },

  deleteResearchResult: async (id) => {
    const response = await apiClient.delete(`/api/research-results/${id}`)
    return response.data
  },

  runResearchPipeline: async (topic) => {
    const response = await apiClient.post('/api/research-results/research', {
      topic
    })
    return response.data
  },

  // Decks endpoints (optional but helpful for full coverage)
  getDecks: async () => {
    const response = await apiClient.get('/api/decks', {
      params: { userId: USER_ID }
    })
    return response.data
  },

  createDeck: async (name) => {
    const response = await apiClient.post('/api/decks', {
      name,
      userId: USER_ID
    })
    return response.data
  },

  deleteDeck: async (id) => {
    const response = await apiClient.delete(`/api/decks/${id}`)
    return response.data
  },

  // Flashcards endpoints
  getFlashcardsByDeck: async (deckId) => {
    const response = await apiClient.get(`/api/decks/${deckId}/flashcards`)
    return response.data
  },

  createFlashcard: async (deckId, question, answer) => {
    const response = await apiClient.post(`/api/decks/${deckId}/flashcards`, {
      question,
      answer
    })
    return response.data
  }
}

export default api
