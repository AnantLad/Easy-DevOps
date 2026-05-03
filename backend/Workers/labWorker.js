import { Worker } from "bullmq";
import IORedis from "ioredis";
import { labQueue } from "../queue/labQueue.js";
import { spawn } from "child_process";
import LabSession from "../Models/LabSession.js";

const connection = new IORedis();

const worker = new Worker(
    "labQueue",
    async (job) => {
    const { userId, sessionId } = job.data;

    try {
        const containerId = await createContainer();

        await LabSession.findByIdAndUpdate(sessionId, {
            containerId,
            status: "running",
            expireTime: new Date(Date.now() + 60 * 60 * 1000),
        });

        return { success: true };
    } catch (error) {
        await LabSession.findByIdAndUpdate(sessionId,{ 
            status: "failed" 
        });
        throw error;        
        }
    },
    { connection }
);

// Dummy function (replace with real Docker/terraform logic)
async function createContainer() {
    return new Promise((resolve, reject) => {
        const process = spawn("Docker",[
            "run",
            "-dit",
            "--name",
            `lab-${Date.now()}`,
            "ubuntu",
        ]);
        let output = "";

        process.stdout.on("data", (data) => {
            output += data.toString();
        });

        process.on("close", () => {
            resolve(output.trim()); // Return container ID
        });

        process.on("error", reject);
    });
}   