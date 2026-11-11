
const geminiService = require("./geminiService");

// Test Planner Agent
async function createTestPlan(applicationName, requirements) {

    const prompt = `
You are TestPilot's Test Planner Agent.

Your job is to analyse application requirements
and create a comprehensive software testing plan.

Application Name: ${applicationName}

Requirements:
${requirements.map((item, index) => `${index + 1}. ${item}`).join("\n")}

Identify:
1. Functional test scenarios.
2. Positive test scenarios.
3. Negative test scenarios.
4. Edge cases.

Return valid JSON only in this format:

{
  "applicationName": "Application name",
  "summary": "Brief analysis of the application",
  "scenarios": [
    {
      "title": "Scenario title",
      "objective": "What needs to be tested",
      "category": "POSITIVE",
      "priority": "HIGH"
    }
  ]
}

Do not generate detailed test steps.
Focus on planning test scenarios.
`;

    const response = await geminiService.generateResponse(prompt);

    return JSON.parse(response);
}

module.exports = {
    createTestPlan
};
