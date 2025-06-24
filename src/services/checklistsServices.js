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

module.exports = {
    createChecklist,
    getAllChecklists
};
