const express = require("express");
const authJWT = require("../middlewares/authJWT");
const checklistController = require("../controllers/checklistsController");

const router = express.Router();

router.post("/", authJWT, checklistController.create);
router.get("/", authJWT, checklistController.getAll);
router.delete("/:checklistId", authJWT, checklistController.remove);

module.exports = router;