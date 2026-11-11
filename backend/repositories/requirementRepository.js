
const pool = require("../config/db");

// Insert a new requirement into PostgreSQL
async function create(applicationName, requirements) {

    const query = `
        INSERT INTO requirements
        (application_name, requirements)
        VALUES ($1, $2)
        RETURNING *;
    `;

   const values = [
    applicationName,
    JSON.stringify(requirements)
];

    const result = await pool.query(query, values);

    return result.rows[0];
}

// Retrieve all requirements from PostgreSQL
async function findAll() {

    const query = `
        SELECT * FROM requirements
        ORDER BY id DESC;
    `;

    const result = await pool.query(query);

    return result.rows;
}
// Retrieve one requirement using its ID
async function findById(id) {

    const query = `
        SELECT * FROM requirements
        WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}

// Update an existing requirement
async function update(id, applicationName, requirements) {

    const query = `
        UPDATE requirements
        SET application_name = $1,
            requirements = $2
        WHERE id = $3
        RETURNING *;
    `;

    const values = [
        applicationName,
        JSON.stringify(requirements),
        id
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

// Delete a requirement using its ID
async function deleteById(id) {

    const query = `
        DELETE FROM requirements
        WHERE id = $1
        RETURNING *;
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
}

module.exports = {
    create,
    findAll,
    findById,
    update,
    deleteById
};
