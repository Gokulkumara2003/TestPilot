const testCaseRepository = require("../repositories/testCaseRepository");

// Create a new test case
async function createTestCase(testCase) {

    const newTestCase = await testCaseRepository.create(testCase);

    return newTestCase;
}

// Get all test cases
async function getAllTestCases() {
    return await testCaseRepository.findAll();
}

async function getTestCasesByRequirementId(requirementId) {
    return await testCaseRepository.findByRequirementId(requirementId);
}

module.exports = {
    createTestCase,
    getAllTestCases,
    getTestCasesByRequirementId
};