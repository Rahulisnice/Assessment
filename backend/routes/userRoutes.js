import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createData,
  deleteData,
  UpdateData,
  getAllUsers,
} from "../controller/userController.js";

const router = express.Router();

router.post("/create", protect, createData);
router.delete("/delete/:id", protect, deleteData);
router.patch("/update/:id", protect, UpdateData);
router.get("/all", protect, getAllUsers);

export default router;
