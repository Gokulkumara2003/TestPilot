
const requirementService = require("../services/requirementService");

async function createRequirement(req, res, next) {

    try {

        const { applicationName, requirements } = req.body;

        if (
            typeof applicationName !== "string" ||
            applicationName.trim() === ""
        ) {
            return res.status(400).json({
                error: "Application name is required"
            });
        }

        if (
            !Array.isArray(requirements) ||
            requirements.length === 0 ||
            !requirements.every(
                item => typeof item === "string" && item.trim() !== ""
            )
        ) {
            return res.status(400).json({
                error: "Valid requirements are required"
            });
        }

        const newRequirement = await requirementService.createRequirement(
            applicationName,
            requirements
        );

        res.status(201).json({
            message: "Requirements saved successfully",
            data: newRequirement
        });

    } catch (error) {

        next(error);

    }
}

async function getAllRequirements(req, res, next) {

    try {

        const requirements = await requirementService.getAllRequirements();

        res.status(200).json({
            total: requirements.length,
            data: requirements
        });

    } catch (error) {

        next(error);

    }
}

async function getRequirementById(req, res, next) {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "Invalid requirement ID"
            });
        }

        const requirement = await requirementService.getRequirementById(id);

        if (!requirement) {
            return res.status(404).json({
                error: "Requirement not found"
            });
        }

        res.status(200).json({
            data: requirement
        });

    } catch (error) {

        next(error);

    }
}

async function updateRequirement(req, res, next) {

    try {

        const id = Number(req.params.id);

        const { applicationName, requirements } = req.body;

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "Invalid requirement ID"
            });
        }

        if (
            typeof applicationName !== "string" ||
            applicationName.trim() === ""
        ) {
            return res.status(400).json({
                error: "Application name is required"
            });
        }

        if (
            !Array.isArray(requirements) ||
            requirements.length === 0 ||
            !requirements.every(
                item => typeof item === "string" && item.trim() !== ""
            )
        ) {
            return res.status(400).json({
                error: "Valid requirements are required"
            });
        }

        const updatedRequirement =
            await requirementService.updateRequirement(
                id,
                applicationName,
                requirements
            );

        if (!updatedRequirement) {
            return res.status(404).json({
                error: "Requirement not found"
            });
        }

        res.status(200).json({
            message: "Requirement updated successfully",
            data: updatedRequirement
        });

    } catch (error) {

        next(error);

    }
}

async function deleteRequirement(req, res, next) {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "Invalid requirement ID"
            });
        }

        const deletedRequirement =
            await requirementService.deleteRequirement(id);

        if (!deletedRequirement) {
            return res.status(404).json({
                error: "Requirement not found"
            });
        }

        res.status(200).json({
            message: "Requirement deleted successfully",
            data: deletedRequirement
        });

    } catch (error) {

        next(error);

    }
}

module.exports = {
    createRequirement,
    getAllRequirements,
    getRequirementById,
    updateRequirement,
    deleteRequirement
};
