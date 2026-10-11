
const { PDFParse } = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.matchResume = async (req, res) => {
  let parser;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }

    const { jobDescription } = req.body;

    if (
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        message: "Please provide a job description.",
      });
    }

    parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfData = await parser.getText();
    const resumeText = pdfData.text?.trim();

    if (!resumeText) {
      return res.status(400).json({
        message: "Could not extract text from the PDF resume.",
      });
    }

    const prompt = `
You are a resume and job description matching evaluator.

Compare the candidate's resume with the job description objectively.

Return ONLY valid JSON in this format:
{
  "matchScore": 0,
  "matchingSkills": [],
  "missingSkills": []
}

Calculate a score out of 100 using these weights:
1. Skills and technical requirements: 50 points
2. Experience requirement: 25 points
3. Education and qualifications: 15 points
4. Other job requirements: 10 points

Only use information explicitly present in the resume
and job description. Do not invent skills, experience,
education, or qualifications.

Consider the stated experience requirement fairly.
Do not penalize a fresher for lacking professional
experience when the job is intended for freshers.
Missing required experience must meaningfully affect
the score.

matchingSkills must contain skills clearly present in
both documents. missingSkills must contain important
required skills not clearly demonstrated in the resume.

The score must be an integer from 0 to 100.
Return only the JSON object without markdown.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0,
      },
    });

    const result = JSON.parse(response.text);

    if (
      !Number.isInteger(result.matchScore) ||
      result.matchScore < 0 ||
      result.matchScore > 100 ||
      !Array.isArray(result.matchingSkills) ||
      !Array.isArray(result.missingSkills)
    ) {
      throw new Error("Invalid response format from AI.");
    }

    return res.json(result);
  } catch (error) {
    console.error("Resume matching error:", error);

    return res.status(500).json({
      message: "Could not analyze the resume.",
    });
  } finally {
    if (parser) {
      await parser.destroy().catch(() => {});
    }
  }
};
