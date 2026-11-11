
const requirementRepository = require("../repositories/requirementRepository");

async function createRequirement(applicationName, requirements) {

    const newRequirement = await requirementRepository.create(
        applicationName,
        requirements
    );

    return newRequirement;
}

async function getAllRequirements() {

    const requirements = await requirementRepository.findAll();

    return requirements;
}


async function getRequirementById(id) {

    const requirement = await requirementRepository.findById(id);

    return requirement;
}


async function updateRequirement(id, applicationName, requirements) {

    const existingRequirement = await requirementRepository.findById(id);

    if (!existingRequirement) {
        return null;
    }

    const updatedRequirement = await requirementRepository.update(
        id,
        applicationName,
        requirements
    );

    return updatedRequirement;
}

async function deleteRequirement(id) {

    const existingRequirement = await requirementRepository.findById(id);

    if (!existingRequirement) {
        return null;
    }

    const deletedRequirement = await requirementRepository.deleteById(id);

    return deletedRequirement;
}

module.exports = {
    createRequirement,
    getAllRequirements,
    getRequirementById,
    updateRequirement,
    deleteRequirement
};