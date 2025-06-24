const { Checklists, ChecklistItem } = require("../../database/models");

const createChecklist = async ({ name, userId }) => {
    const checklist = await Checklists.create({ name, userId });
    return checklist;
};

const getAllChecklists = async (userId) => {
    const checklists = await Checklists.findAll({
        where: { userId },
        include: [{
            model: ChecklistItem,
            as: "items",
            attributes: ["id", "itemName", "isActive", "createdAt", "updatedAt"]
        }],
        order: [
            ["createdAt", "DESC"],
            ["items", "createdAt", "DESC"]
        ]
    });

    return checklists;
};

const deleteChecklist = async ({ checklistId, userId }) => {
    const checklist = await Checklists.findOne({
        where: { id: checklistId, userId },
        include: [{ model: ChecklistItem, as: "items" }]
    });

    if (!checklist) return false;

    await checklist.destroy();

    return true;
};

module.exports = {
    createChecklist,
    getAllChecklists,
    deleteChecklist
};