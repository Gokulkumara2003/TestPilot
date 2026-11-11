
const testForm = document.getElementById("testForm");
const generateButton = document.getElementById("generateButton");
const message = document.getElementById("message");
const resultsSection = document.getElementById("resultsSection");
const resultSummary = document.getElementById("resultSummary");
const testCasesContainer = document.getElementById("testCasesContainer");

const totalCount = document.getElementById("totalCount");
const highCount = document.getElementById("highCount");
const mediumCount = document.getElementById("mediumCount");
const lowCount = document.getElementById("lowCount");

const searchTestCases = document.getElementById("searchTestCases");
const priorityFilter = document.getElementById("priorityFilter");

let allTestCases = [];


// ======================================
// 1. FORM SUBMISSION
// ======================================

testForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const applicationName =
        document.getElementById("applicationName").value.trim();

    const requirementsText =
        document.getElementById("requirements").value.trim();

    const requirements = requirementsText
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0);

    if (!applicationName || requirements.length === 0) {
        message.textContent = "Please enter application details.";
        return;
    }

    // Loading status
    generateButton.disabled = true;
    generateButton.textContent = "Generating...";

    message.textContent =
        "AI agents are analysing your requirements...";

    message.style.color = "#4f46e5";

    // Clear previous results
    testCasesContainer.innerHTML = "";
    allTestCases = [];

    totalCount.textContent = "0";
    highCount.textContent = "0";
    mediumCount.textContent = "0";
    lowCount.textContent = "0";

    try {

        // Send requirements to backend
        const response = await fetch("/api/ai/generate-tests", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                applicationName: applicationName,
                requirements: requirements
            })

        });

        const data = await response.json();

        console.log("FULL SERVER RESPONSE:", data);

        if (!response.ok) {
            throw new Error(
                data.details ||
                data.error ||
                data.message ||
                "Failed to generate test cases."
            );
        }

        const result = data.data;

        // Validate backend response
        if (
            !result ||
            !result.requirement ||
            !Array.isArray(result.testCases)
        ) {
            throw new Error("Invalid response received from server.");
        }

        // Success message
        message.textContent =
            "Test cases generated successfully!";

        message.style.color = "#15803d";

        // Display application summary
        const savedApplicationName =
            result.requirement.application_name || applicationName;

        resultSummary.textContent =
            `${result.totalTestCases} test cases generated for ${savedApplicationName}.`;

        // Reset search and filter
        searchTestCases.value = "";
        priorityFilter.value = "ALL";

        // Display test cases
        displayTestCases(result.testCases);

        resultsSection.style.display = "block";

    } catch (error) {

        console.error("Frontend Error:", error);

        message.textContent = error.message;
        message.style.color = "#dc2626";

    } finally {

        generateButton.disabled = false;
        generateButton.textContent = "Generate Test Cases";

    }

});


// ======================================
// 2. DISPLAY TEST CASES
// ======================================

function displayTestCases(testCases) {

    // Store original test cases
    allTestCases = testCases;

    // Calculate statistics
    totalCount.textContent = allTestCases.length;

    highCount.textContent = allTestCases.filter(
        testCase => testCase.priority?.toUpperCase() === "HIGH"
    ).length;

    mediumCount.textContent = allTestCases.filter(
        testCase => testCase.priority?.toUpperCase() === "MEDIUM"
    ).length;

    lowCount.textContent = allTestCases.filter(
        testCase => testCase.priority?.toUpperCase() === "LOW"
    ).length;

    // Display all test cases initially
    renderTestCases(allTestCases);

}


// ======================================
// 3. RENDER TEST CASE CARDS
// ======================================

function renderTestCases(testCases) {

    testCasesContainer.innerHTML = "";

    if (testCases.length === 0) {

        const emptyMessage = document.createElement("p");

        emptyMessage.textContent =
            "No matching test cases found.";

        testCasesContainer.appendChild(emptyMessage);

        return;
    }

    testCases.forEach((testCase, index) => {

        const card = document.createElement("div");

        card.className = "test-case-card";

        // Title
        const title = document.createElement("h3");

        title.textContent =
            `${index + 1}. ${testCase.title}`;

        // Priority
        const priority = document.createElement("span");

        priority.className = "priority";

        priority.textContent =
            `Priority: ${testCase.priority || "MEDIUM"}`;

        // Description
        const description = document.createElement("p");

        description.textContent =
            testCase.description || "";

        // Preconditions
        const preconditions = document.createElement("p");

        preconditions.textContent =
            `Preconditions: ${testCase.preconditions || "None"}`;

        // Test steps heading
        const stepsHeading = document.createElement("p");

        stepsHeading.textContent = "Test Steps:";

        // Steps list
        const stepsList = document.createElement("ol");

        const steps = Array.isArray(testCase.steps)
            ? testCase.steps
            : [];

        steps.forEach(step => {

            const listItem = document.createElement("li");

            listItem.textContent = step;

            stepsList.appendChild(listItem);

        });

        // Expected result
        const expectedResult = document.createElement("p");

        expectedResult.className = "expected-result";

        expectedResult.textContent =
            `Expected Result: ${
                testCase.expected_result ||
                testCase.expectedResult ||
                "Not specified"
            }`;

        // Add elements to card
        card.appendChild(title);
        card.appendChild(priority);
        card.appendChild(description);
        card.appendChild(preconditions);
        card.appendChild(stepsHeading);
        card.appendChild(stepsList);
        card.appendChild(expectedResult);

        testCasesContainer.appendChild(card);

    });

}


// ======================================
// 4. SEARCH AND PRIORITY FILTER
// ======================================

searchTestCases.addEventListener(
    "input",
    filterTestCases
);

priorityFilter.addEventListener(
    "change",
    filterTestCases
);


function filterTestCases() {

    const searchText =
        searchTestCases.value.toLowerCase().trim();

    const selectedPriority =
        priorityFilter.value;

    const filteredTestCases = allTestCases.filter(testCase => {

        const matchesSearch =
            (testCase.title || "")
                .toLowerCase()
                .includes(searchText);

        const matchesPriority =
            selectedPriority === "ALL" ||
            (testCase.priority || "").toUpperCase() === selectedPriority;

        return matchesSearch && matchesPriority;

    });

    renderTestCases(filteredTestCases);

}
