import AuditLog from "../models/AuditLog.js";

export async function getAuditLogs(req, res) {
  try {
    const logs = await AuditLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    console.error("Error in getAuditLogs controller:", error.message);

    res.status(500).json({ message: "Server error" });
  }
}
