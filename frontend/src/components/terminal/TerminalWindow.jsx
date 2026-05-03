import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const TerminalWindow = ({ sessionId }) => {
  const [logs, setLogs] = useState([]);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  useEffect(() => {
    if (!sessionId) {
      setLogs([
        { type: "info", text: "No session connected. Please start a lab to begin." },
      ]);
      return;
    }

    // Connect to WebSocket
    const newSocket = io(import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5000", {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    newSocket.on("connect", () => {
      console.log("Connected to terminal socket");
      setIsConnected(true);
      newSocket.emit("join-session", { sessionId });
      setLogs((prev) => [
        ...prev,
        { type: "success", text: "✓ Connected to lab environment" },
      ]);
    });

    newSocket.on("terminal-output", (data) => {
      setLogs((prev) => [
        ...prev,
        { type: "output", text: data.output || data },
      ]);
    });

    newSocket.on("error", (error) => {
      setLogs((prev) => [
        ...prev,
        { type: "error", text: `Error: ${error.message || error}` },
      ]);
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from terminal socket");
      setIsConnected(false);
      setLogs((prev) => [
        ...prev,
        { type: "warning", text: "⚠ Disconnected from lab environment" },
      ]);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [sessionId]);

  const getLogColor = (type) => {
    const colors = {
      info: "text-slate-400",
      output: "text-green-400",
      success: "text-green-500",
      error: "text-red-400",
      warning: "text-yellow-400",
    };
    return colors[type] || "text-slate-300";
  };

  return (
    <div className="bg-black rounded-xl border border-slate-800 h-full flex flex-col">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-cyan-500 rounded-full" />
        </div>
        <div className="text-xs text-slate-500">
          {isConnected ? "Connected" : "Disconnected"}
          {sessionId && ` • ${sessionId.slice(0, 8)}`}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-4 text-green-400 font-mono text-sm overflow-y-auto bg-gradient-to-b from-black to-slate-950">
        {logs.length === 0 ? (
          <div className="text-slate-500">
            <p>$ Waiting for lab to start...</p>
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={getLogColor(log.type)}>
              {log.text}
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 border-t border-slate-800 text-xs text-slate-500 bg-slate-900">
        {!sessionId && (
          <p>Start a lab session to interact with the terminal</p>
        )}
      </div>
    </div>
  );
};

export default TerminalWindow;