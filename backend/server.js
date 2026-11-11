const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

// Import routes
const requirementRoutes = require("./routes/requirementRoutes");
const testCaseRoutes = require("./routes/testCaseRoutes");

// Import services
const geminiService = require("./services/geminiService");
const requirementService = require("./services/requirementService");
const testCaseService = require("./services/testCaseService");
const testPlannerService = require("./services/testPlannerService");
const testGeneratorService = require("./services/testGeneratorService");

// Home API
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Health API
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        application: "TestPilot",
        message: "Backend is running successfully"
    });
});

// Connect routes
app.use("/api/requirements", requirementRoutes);
app.use("/api/test-cases", testCaseRoutes);



app.post("/api/ai/test", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== "string") {
            return res.status(400).json({
                error: "Prompt is required"
            });
        }

        const response = await geminiService.generateResponse(prompt);

        res.status(200).json({
            message: "Gemini AI response generated successfully",
            response: response
        });

    } catch (error) {
        res.status(500).json({
            error: "AI generation failed",
            details: error.message
        });
    }
});

// Test Planner Agent API
app.post("/api/ai/plan", async (req, res) => {
    try {
        const { applicationName, requirements } = req.body;

        // Validate input
        if (
            !applicationName ||
            !Array.isArray(requirements) ||
            requirements.length === 0
        ) {
            return res.status(400).json({
                error: "Application name and requirements are required"
            });
        }

        console.log("Test Planner Agent started...");

        // Call Test Planner Agent
        const testPlan = await testPlannerService.createTestPlan(
            applicationName,
            requirements
        );
        console.log("Test Planner completed successfully!");

        res.status(200).json({
            message: "Test plan generated successfully",
            data: testPlan
        });

    } catch (error) {
        console.error("Test Planner Error:", error.message);

        res.status(500).json({
            error: "Test plan generation failed",
            details: error.message
        });
    }
});

// Complete AI Test Generation Workflow

// AI Test Generation Pipeline
app.post("/api/ai/generate-tests", async (req, res) => {
    try {
        const { applicationName, requirements } = req.body;

        if (
            !applicationName ||
            !Array.isArray(requirements) ||
            requirements.length === 0
        ) {
            return res.status(400).json({
                error: "Application name and requirements are required"
            });
        }

        console.log("TestPilot AI Pipeline Started...");

     // Step 1: Test Planner Agent
console.log("Test Planner Agent is working...");

const testPlan = await testPlannerService.createTestPlan(
    applicationName,
    requirements
);

console.log("Test Planner completed successfully!");

// Step 2: Test Generator Agent
console.log("Test Generator Agent is working...");

const generatedTests =
    await testGeneratorService.generateTestCases(testPlan);

console.log("Test Generator completed successfully!");

// Step 3: Save requirements
const savedRequirement =
    await requirementService.createRequirement(
        applicationName,
        requirements
    );

console.log("Requirements saved:", savedRequirement.id);

// Step 4: Save generated test cases
console.log("Saving test cases to PostgreSQL...");

const savedTestCases = [];

for (const testCase of generatedTests.testCases) {
    const savedTestCase = await testCaseService.createTestCase({
        requirementId: savedRequirement.id,
        title: testCase.title,
        description: testCase.description,
        preconditions: testCase.preconditions,
        steps: testCase.steps,
        expectedResult: testCase.expectedResult,
        priority: testCase.priority,
        status: "DRAFT"
    });

    savedTestCases.push(savedTestCase);
}

        console.log("AI Pipeline Completed Successfully!");

        res.status(201).json({
            message: "Test cases generated and saved successfully",
            data: {
                requirement: savedRequirement,
                testPlan: testPlan,
                totalTestCases: savedTestCases.length,
                testCases: savedTestCases
            }
        });

    } catch (error) {
        console.error("AI Pipeline Error:", error.message);

        res.status(500).json({
            error: "AI test generation failed",
            details: error.message
        });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Backend Error:", err.message);

    res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong in TestPilot"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`TestPilot server is running on port ${PORT}`);
});