const express = require("express")
const authController = require("../controllers/authController");

const router = express.Router()

router.get("/", (req, res) => {
    res.json({
        info: "Welcome to To Do List API"
    });
});

// AUTH
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router