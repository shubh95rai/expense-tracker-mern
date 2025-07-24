import express from "express";
import { adminOnly, protect } from "../middleware/authMiddleware.js";
import { getAuditLogs } from "../controllers/auditController.js";

const auditRouter = express.Router();

auditRouter.get("/", protect, adminOnly, getAuditLogs);

export default auditRouter;
