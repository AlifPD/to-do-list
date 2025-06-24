const express = require("express");
const authJWT = require("../middlewares/authJWT");
const checklistController = require("../controllers/checklistsController");
const itemsRouter = require("./checklistItemsRoutes");

const router = express.Router();

router.post("/", authJWT, checklistController.create);
router.get("/", authJWT, checklistController.getAll);
router.delete("/:checklistId", authJWT, checklistController.remove);

router.use("/:checklistId/item", itemsRouter);

module.exports = router;