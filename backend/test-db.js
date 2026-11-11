const pool = require("./config/db");

async function testConnection() {

    try {

        const result = await pool.query(
            "SELECT NOW() AS current_time"
        );

        console.log("PostgreSQL connected successfully!");

        console.log(result.rows[0]);

    } catch (error) {

        console.error("Database connection failed:");
        console.error(error.message);

    } finally {

        await pool.end();

    }
}

testConnection();