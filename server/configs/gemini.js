import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main(prompt) {
  const maxRetries = 3;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      return response.text;
    } catch (error) {
      console.log(`Gemini attempt ${attempt + 1} failed`);

      // Retry only for temporary server errors
      if (error.status === 503 && attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;

        console.log(`Retrying after ${delay / 1000} seconds...`);

        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

export default main;