```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 120000,
});

export const educationAPI = {
  summarize: async (text, maxLength = 128) => {
    const response = await api.post('/education/summarize', { 
      text, 
      max_length: maxLength 
    });
    return response.data;
  },
  
  answerQuestion: async (question, imageBase64 = null, maxTokens = 200) => {
    const response = await api.post('/education/qa', { 
      question, 
      image: imageBase64,
      max_tokens: maxTokens
    });
    return response.data;
  },
};

export const socialAPI = {
  generateImage: async (prompt, negativePrompt = '', width = 512, height = 512) => {
    const response = await api.post('/social/generate-image', { 
      prompt, 
      negative_prompt: negativePrompt,
      width,
      height
    });
    return response.data;
  },
  
  generateMusic: async (prompt, duration = 10) => {
    const response = await api.post('/social/generate-music', { 
      prompt, 
      duration 
    });
    return response.data;
  },
};

export default api;

```