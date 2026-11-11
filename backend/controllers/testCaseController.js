const testCaseService = require("../services/testCaseService");

// Create a new test case
async function createTestCase(req, res, next) {

    try {

        const {
            requirementId,
            title,
            description,
            preconditions,
            steps,
            expectedResult,
            priority
        } = req.body;

        // Validate requirement ID
        if (
            !Number.isInteger(requirementId) ||
            requirementId <= 0
        ) {
            return res.status(400).json({
                error: "Valid requirement ID is required"
            });
        }

        // Validate title
        if (
            typeof title !== "string" ||
            title.trim() === ""
        ) {
            return res.status(400).json({
                error: "Test case title is required"
            });
        }

        // Validate steps
        if (
            !Array.isArray(steps) ||
            steps.length === 0 ||
            !steps.every(
                step => typeof step === "string" && step.trim() !== ""
            )
        ) {
            return res.status(400).json({
                error: "Valid test steps are required"
            });
        }

        // Validate expected result
        if (
            typeof expectedResult !== "string" ||
            expectedResult.trim() === ""
        ) {
            return res.status(400).json({
                error: "Expected result is required"
            });
        }

        // Prepare test case object
        const testCase = {
            requirementId,
            title: title.trim(),
            description: description || null,
            preconditions: preconditions || null,
            steps,
            expectedResult: expectedResult.trim(),
            priority: priority || "MEDIUM",
            status: "DRAFT"
        };

        // Save test case
        const newTestCase = await testCaseService.createTestCase(testCase);

        res.status(201).json({
            message: "Test case created successfully",
            data: newTestCase
        });

    } catch (error) {

        next(error);

    }
}

// Get all test cases
async function getAllTestCases(req, res, next) {
    try {
        const testCases = await testCaseService.getAllTestCases();

        res.status(200).json({
            message: "Test cases retrieved successfully",
            count: testCases.length,
            data: testCases
        });
    } catch (error) {
        next(error);
    }
}

async function getTestCasesByRequirementId(req, res, next) {
    try {
        const requirementId = Number(req.params.requirementId);

        if (!Number.isInteger(requirementId) || requirementId <= 0) {
            return res.status(400).json({
                error: "Valid requirement ID is required"
            });
        }

        const testCases =
            await testCaseService.getTestCasesByRequirementId(requirementId);

        res.status(200).json({
            message: "Test cases retrieved successfully",
            count: testCases.length,
            data: testCases
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTestCase,
    getAllTestCases,
    getTestCasesByRequirementId
};