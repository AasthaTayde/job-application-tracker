const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const models = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
];

async function testModels() {
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: "Say hello in one short sentence.",
      });

      console.log(`WORKS: ${model}`);
      console.log(`Response: ${response.text}\n`);

    } catch (error) {
      console.log(`FAILED: ${model}`);
      console.log(`Status: ${error.status || "unknown"}`);
      console.log(`Message: ${error.message}\n`);
    }
  }
}

testModels();