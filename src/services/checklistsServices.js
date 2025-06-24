const { Checklists } = require("../../database/models");

const createChecklist = async ({ name, userId }) => {
    const checklist = await Checklists.create({ name, userId });
    return checklist;
};

const getAllChecklists = async (userId) => {
    const checklists = await Checklists.findAll({
        where: { userId },
        order: [["createdAt", "DESC"]]
    });

    return checklists;
};

const deleteChecklist = async ({ checklistId, userId }) => {
    const deleted = await Checklists.destroy({
        where: {
            id: checklistId,
            userId
        }
    });

    return deleted > 0; // returns true if deleted, false otherwise
};

module.exports = {
    createChecklist,
    getAllChecklists,
    deleteChecklist
};