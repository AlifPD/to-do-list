const express = require("express");
const authJWT = require("../middlewares/authJWT");
const controller = require("../controllers/checklistItemsController");

const router = express.Router({ mergeParams: true });

router.post("/", authJWT, controller.create);
router.get("/", authJWT, controller.getAll);
router.get("/:checklistItemId", authJWT, controller.getById);
router.put("/:checklistItemId", authJWT, controller.toggleStatus);
router.put("/rename/:checklistItemId", authJWT, controller.rename);
router.delete("/:checklistItemId", authJWT, controller.remove);

module.exports = router;