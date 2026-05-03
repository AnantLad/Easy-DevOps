import { Server } from "socket.io";
import { spawn } from "child_process";
import LabSession from "../Models/LabSession.js";

export const initTerminalSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",   
        },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        let shellProcess = null;
        
        // When user joins a lab 
        socket.on("joinLab", async ({ sessionId }) => {
            try {
                const session = await LabSession.findById(sessionId);
                
                if(!session || session.status !== "running") {
                    return socket.emit("error", "Lab not running");
                }
            
            // Attach to container shell
                shellProcess = spawn("docker", [
                    "exec",
                    "-it",
                    session.containerId,
                    "/bin/bash",
                ]);
                // Send output to frontend 
                shellProcess.stdout.on("data", (data) => {
                        socket.emit("output", data.toString());
                });

                shellProcess.stderr.on("data", (data) => {
                    socket.emit("output", data.toString());
                });
                shellProcess.on("close", (code) => {
                    socket.emit("output", "\r\n[session closed]");
                });
            } catch (error) {
                console.error(error);
                socket.emit("error", "Failed to join lab");
            }
        });

        // When user types command
        socket.on("input", (data) => {
            if (shellProcess && shellProcess.stdin) {
                shellProcess.stdin.write(data);
            }
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
            if (shellProcess) {
                shellProcess.kill("SIGTERM");
            }
        });
    });
};
