import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const quizService = {
  /**
   * Generates a quiz with exactly 5 multiple choice questions on the given topic.
   * @param {string} topic 
   * @param {string} difficulty 
   * @returns {Promise<{questions: Array}>}
   */
  generateQuiz: async (topic, difficulty) => {
    const response = await axios.post(`${API_BASE_URL}/api/quiz/generate`, {
      topic,
      difficulty
    });
    return response.data;
  }
};

export default quizService;
