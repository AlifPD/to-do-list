const checklistService = require("../services/checklistsServices");

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user?.id;

        if (!name) return res.status(400).json({ info: "Checklist name is required" });

        const checklist = await checklistService.createChecklist({ name, userId });

        res.status(201).json({
            info: "Checklist created successfully",
            data: checklist
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

const getAll = async (req, res) => {
    try {
        const userId = req.user?.id;
        const checklists = await checklistService.getAllChecklists(userId);

        res.status(200).json({ info: "Success fetch all checklists", data: checklists });
    } catch (err) {
        console.error(err);
        res.status(500).json({ info: "Internal Server Error" });
    }
};

module.exports = {
    create,
    getAll
};
