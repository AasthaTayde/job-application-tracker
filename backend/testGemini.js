const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "Say hello in one short sentence.",
    });

    console.log("Gemini response:");
    console.log(response.text);
  } catch (error) {
    console.error("Gemini error:", error);
  }
}

testGemini();