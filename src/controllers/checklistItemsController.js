const service = require("../services/checklistItemsServices");

const create = async (req, res) => {
    try {
        const { checklistId } = req.params;
        const { itemName } = req.body;

        if (!itemName) return res.status(400).json({ info: "Item name is required" });

        const newItem = await service.createItem({ checklistId, itemName });

        res.status(201).json({ info: "Checklist item created", data: newItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

const getAll = async (req, res) => {
    try {
        const { checklistId } = req.params;
        const items = await service.getAllItems(checklistId);
        res.status(200).json({ info: "Success fetch checklist items", data: items });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

const getById = async (req, res) => {
    try {
        const { checklistId, checklistItemId } = req.params;
        const item = await service.getItemById({ checklistId, checklistItemId });

        if (!item) return res.status(404).json({ info: "Checklist item not found" });

        res.status(200).json({ info: "Success", data: item });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

const toggleStatus = async (req, res) => {
    try {
        const { checklistId, checklistItemId } = req.params;
        const updated = await service.toggleItemStatus({ checklistId, checklistItemId });

        if (!updated) return res.status(404).json({ info: "Checklist item not found" });

        res.status(200).json({ info: "Status toggled", data: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

const rename = async (req, res) => {
    try {
        const { checklistId, checklistItemId } = req.params;
        const { itemName } = req.body;

        if (!itemName) return res.status(400).json({ info: "New name required" });

        const renamed = await service.renameItem({ checklistId, checklistItemId, itemName });

        if (!renamed) return res.status(404).json({ info: "Checklist item not found" });

        res.status(200).json({ info: "Item renamed", data: renamed });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

const remove = async (req, res) => {
    try {
        const { checklistId, checklistItemId } = req.params;
        const deleted = await service.deleteItem({ checklistId, checklistItemId });

        if (!deleted) return res.status(404).json({ info: "Checklist item not found" });

        res.status(200).json({ info: "Checklist item deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    toggleStatus,
    rename,
    remove
};
