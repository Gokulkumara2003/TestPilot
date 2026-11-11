const express = require("express");

const router = express.Router();

const testCaseController = require("../controllers/testCaseController");

// Create test case
router.post("/", testCaseController.createTestCase);

// Get all test cases
router.get("/", testCaseController.getAllTestCases);

// Get test cases by requirement ID
router.get(
    "/requirement/:requirementId",
    testCaseController.getTestCasesByRequirementId
);

module.exports = router;