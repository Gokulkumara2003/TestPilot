const pool = require("../config/db");

// Create a new test case
async function create(testCase) {

    const query = `
        INSERT INTO test_cases
        (
            requirement_id,
            title,
            description,
            preconditions,
            steps,
            expected_result,
            priority,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;

    const values = [
        testCase.requirementId,
        testCase.title,
        testCase.description,
        testCase.preconditions,
        JSON.stringify(testCase.steps),
        testCase.expectedResult,
        testCase.priority,
        testCase.status
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

// Get all test cases
async function findAll() {
    const query = `
        SELECT * FROM test_cases
        ORDER BY id DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
}

// Get test cases by requirement ID
async function findByRequirementId(requirementId) {
    const query = `
        SELECT * FROM test_cases
        WHERE requirement_id = $1
        ORDER BY id DESC;
    `;

    const result = await pool.query(query, [requirementId]);

    return result.rows;
}

module.exports = {
    create,
    findAll,
    findByRequirementId
};