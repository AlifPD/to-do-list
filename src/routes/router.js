const express = require("express")
const authRouter = require("./authRoutes")
const checklistRouter = require("./checklistsRoutes")

const router = express.Router()

// Base, for testing
router.get("/info", (req, res) => {
    res.json({
        info: "Welcome to To Do List API"
    });
});

// AUTH
router.use("/", authRouter);

// Checklists
router.use("/checklist", checklistRouter);

module.exports = router