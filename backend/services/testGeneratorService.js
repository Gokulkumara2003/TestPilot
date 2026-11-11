
const geminiService = require("./geminiService");

// Test Generator Agent
async function generateTestCases(testPlan) {

    const prompt = `
You are TestPilot's Test Generator Agent.

Your job is to convert a software testing plan
into detailed and actionable test cases.

Application: ${testPlan.applicationName}

Testing Plan:
${JSON.stringify(testPlan.scenarios, null, 2)}

Generate detailed test cases for the supplied scenarios.

IMPORTANT:
- Generate a maximum of 8 test cases.
- Prioritize the most important positive, negative and edge cases.
- Keep each test case concise.
- Each test case should have 3 to 5 steps.
- Ensure the JSON response is complete.
- Never stop in the middle of a JSON object.

Each test case must contain:
1. title
2. description
3. preconditions
4. steps (array of strings)
5. expectedResult
6. priority (LOW, MEDIUM or HIGH)

Rules:
- Generate practical and realistic test steps.
- Include positive, negative and edge cases.
- Avoid duplicate test cases.
- Do not invent application features beyond the requirements.

Return valid JSON only in this format:

{
    "applicationName": "${testPlan.applicationName}",
    "testCases": [
        {
            "title": "Test case title",
            "description": "Test case description",
            "preconditions": "Required conditions",
            "steps": [
                "Step 1",
                "Step 2"
            ],
            "expectedResult": "Expected result",
            "priority": "HIGH"
        }
    ]
}
`;

   const response = await geminiService.generateResponse(prompt);

console.log("Generator AI Raw Response:");
console.log(response);

return JSON.parse(response);
}

module.exports = {
    generateTestCases
};
