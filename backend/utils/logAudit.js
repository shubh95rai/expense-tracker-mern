import AuditLog from "../models/AuditLog.js";

export async function logAudit({ action, userId, metadata = {} }) {
  try {
    await AuditLog.create({
      action,
      user: userId,
      metadata,
    });
  } catch (error) {
    console.error("Error in logAudit", error.message);
    // Not throwing an error to avoid breaking the flow
  }
}
