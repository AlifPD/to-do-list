const { ChecklistItem, Checklists } = require("../../database/models");

const createItem = async ({ checklistId, itemName }) => {
    return await ChecklistItem.create({ itemName, checklistId });
};

const getAllItems = async (checklistId) => {
    return await ChecklistItem.findAll({
        where: { checklistId },
        order: [["createdAt", "DESC"]]
    });
};

const getItemById = async ({ checklistId, checklistItemId }) => {
    return await ChecklistItem.findOne({
        where: { id: checklistItemId, checklistId }
    });
};

const toggleItemStatus = async ({ checklistId, checklistItemId }) => {
    const item = await ChecklistItem.findOne({
        where: { id: checklistItemId, checklistId }
    });
    if (!item) return null;

    item.isActive = !item.isActive;
    await item.save();
    return item;
};

const renameItem = async ({ checklistId, checklistItemId, itemName }) => {
    const item = await ChecklistItem.findOne({
        where: { id: checklistItemId, checklistId }
    });
    if (!item) return null;

    item.itemName = itemName;
    await item.save();
    return item;
};

const deleteItem = async ({ checklistId, checklistItemId }) => {
    const deleted = await ChecklistItem.destroy({
        where: { id: checklistItemId, checklistId }
    });
    return deleted > 0;
};

module.exports = {
    createItem,
    getAllItems,
    getItemById,
    toggleItemStatus,
    renameItem,
    deleteItem
};
