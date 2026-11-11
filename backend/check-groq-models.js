
require("dotenv").config();

const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function checkModels() {
    try {
        const response = await groq.models.list();

        console.log("\nModels available to your Groq API key:\n");

        response.data.forEach((model) => {
            console.log(model.id);
        });

    } catch (error) {
        console.error("Unable to fetch models:", error.message);
    }
}

checkModels();
