import { spawn } from "child_process";
import path from "path";
import LabSession from "../models/LabSession.js";
import fs from "fs";
import { fileURLToPath } from "url";
import logger from "../utils/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runVaildator = async (taskId, sessionId) => {
    const session = await LabSession.findById(sessionId);

    if (!session || session.status !== "running") {
        throw new Error("Lab not running");
    }

    // Load task JSON
    const tasksPath = path.join(__dirname, "../tasks/linux-basics.json");
    const tasks = JSON.parse(fs.readFileSync(tasksPath, "utf-8"));

    const task = tasks.find((t) => t.id === taskId);

    if (!task) throw new Error("Task not found");

    const scriptPath = path.join(
        __dirname,
        `../scripts/validators/${task.validator}`
    );

    return new Promise((resolve, reject) => {
        const process = spawn("docker", [
            "exec",
            session.containerId,
            "bash",
            scriptPath,
        ]);

        let output = "";

        process.stdout.on("data", (data) => {
            output += data.toString();
        });

        process.stderr.on("data", (data) => {
            output += data.toString();
        });

        process.on("close", (code) => {
            logger.info(`Validation completed for task ${taskId}: ${code === 0 ? "success" : "failed"}`);
            resolve({
                success: code === 0,
                message: output,
            });
        });

        process.on("error", reject);
    });
};