
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");
const Groq = require("groq-sdk");

// Primary AI: Gemini
const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Backup AI: Groq
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Try Gemini first, then Groq if Gemini is temporarily unavailable
async function generateResponse(prompt) {

    try {
        console.log("Trying primary AI: Gemini...");

        const response = await gemini.models.generateContent({
            model: "gemini-3.5-flash-lite",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        });

        console.log("Gemini response generated successfully!");

        return response.text;

    } catch (error) {

        const status = Number(error.status || error.code);

        const retryable =
            [429, 500, 502, 503, 504].includes(status) ||
            /UNAVAILABLE|RESOURCE_EXHAUSTED|high demand|overloaded/i
                .test(error.message || "");

        if (!retryable) {
            throw error;
        }

        console.log("Gemini unavailable. Switching to Groq...");

        try {
     const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
        {
            role: "user",
            content: prompt
        }
    ],
    temperature: 0.2,
    max_tokens: 8192
});

            console.log("Groq response generated successfully!");

            return completion.choices[0].message.content;

        } catch (groqError) {
            console.error("Groq fallback failed:", groqError.message);

            throw new Error(
                "Both Gemini and Groq failed. Gemini: " +
                error.message +
                " | Groq: " +
                groqError.message
            );
        }
    }
}

module.exports = {
    generateResponse
};
