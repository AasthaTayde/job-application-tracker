const express = require("express");
const multer = require("multer");
const { PDFParse } = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/match", requireAuth, upload.single("resume"), async (req, res) => {
  try {
    // 1. Check PDF
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }

    // 2. Check job description
    const jobDescription = req.body.jobDescription;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Please provide a job description.",
      });
    }

    // 3. Extract resume text
    const parser = new PDFParse({
      data: req.file.buffer,
    });

    const pdfData = await parser.getText();

    const resumeText = pdfData.text;

    // 4. Ask Gemini to compare them
    const prompt = `
    You are a resume and job description matching evaluator.
    
    Compare the candidate's resume with the job description objectively.
    
    Return ONLY valid JSON in exactly this format:
    
    {
      "matchScore": 0,
      "matchingSkills": [],
      "missingSkills": []
    }
    
    SCORING METHOD:
    
    Calculate the match score out of 100 using these weights:
    
    1. Skills and technical requirements: 50 points
    2. Experience requirement: 25 points
    3. Education and qualifications: 15 points
    4. Other important job requirements: 10 points
    
    EXPERIENCE RULES:
    
    - Carefully identify the experience requirement from the job description.
    - Identify the candidate's relevant experience ONLY from information explicitly stated in the resume.
    - Never assume or invent work experience.
    - If the job description is for a fresher or requires 0-1 years of experience, do not penalize a fresher for lack of professional experience.
    - If the job description requires 2-5 years of experience and the resume does not demonstrate relevant professional experience, the candidate should receive very few points in the 25-point experience category.
    - If the candidate's experience is below the required experience, reduce the experience score proportionally.
    - If the candidate meets or exceeds the required experience, award the appropriate experience points.
    - Experience requirements must have a meaningful effect on the final matchScore.
    
    SKILLS RULES:
    
    - matchingSkills must contain skills clearly present in both the resume and job description.
    - missingSkills must contain important skills explicitly required by the job description that are missing or not clearly demonstrated in the resume.
    - Do not invent skills or experience.
    
    EDUCATION AND QUALIFICATIONS:
    
    - Compare the education, degree, certifications, and qualifications mentioned in the job description with the resume.
    - Do not assume qualifications that are not stated.
    
    OTHER REQUIREMENTS:
    
    - Consider important requirements such as location, availability, domain knowledge, responsibilities, or other explicit requirements in the job description.
    - Only use information that is actually present in the resume or job description.
    
    IMPORTANT:
    
    - A fresher resume should score meaningfully lower against a job requiring 2-5 years of experience than against a similar fresher job, assuming the other requirements are similar.
    - Do not artificially change the score just to make two results different.
    - Base the score on the weighted criteria above.
    - The score must be an integer from 0 to 100.
    - Return only the JSON object.
    - Do not include explanations, markdown, or text outside the JSON.
    

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
        temperature:0,
      },
    });

    // 5. Convert Gemini response into JavaScript object
    const result = JSON.parse(response.text);

    // 6. Send result to React/Postman
    res.json(result);

  } catch (error) {
    console.error("Resume matching error:", error);

    res.status(500).json({
      message: "Could not analyze the resume.",
    });
  }
});

module.exports = router;