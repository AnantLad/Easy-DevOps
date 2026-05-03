import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { labAPI, taskAPI, validationAPI } from "../../services/api";
import LabHeader from "../../components/lab/LabHeader";
import ProgressTracker from "../../components/lab/ProgressTracker";
import TerminalWindow from "../../components/terminal/TerminalWindow";
import CheckButton from "../../components/lab/CheckButton";
import TaskDescription from "../../components/lab/TaskDescription";

const LabPage = () => {
  const [searchParams] = useSearchParams();
  const [currentTask, setCurrentTask] = useState(null);
  const [labSession, setLabSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationInput, setValidationInput] = useState("");
  const [validationLoading, setValidationLoading] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const taskId = searchParams.get("taskId");
  const sessionId = searchParams.get("sessionId");

  useEffect(() => {
    const initializeLab = async () => {
      try {
        setLoading(true);
        setError("");

        // If we have a task ID, fetch the task
        if (taskId) {
          const taskResponse = await taskAPI.getTaskById(taskId);
          const task = taskResponse.data?.task || taskResponse.data || taskResponse;
          setCurrentTask(task);

          // Start a lab session for this task
          try {
            const sessionResponse = await labAPI.startLab(taskId);
            const session = sessionResponse.data || sessionResponse;
            setLabSession(session);
          } catch (err) {
            console.error("Error starting lab:", err);
          }
        }
        // If we have a session ID, fetch existing session
        else if (sessionId) {
          const sessionResponse = await labAPI.getLabSession(sessionId);
          const session = sessionResponse.data || sessionResponse;
          setLabSession(session);

          // Fetch the task for this session
          if (session.taskId) {
            const taskResponse = await taskAPI.getTaskById(session.taskId);
            const task = taskResponse.data?.task || taskResponse.data || taskResponse;
            setCurrentTask(task);
          }
        }
      } catch (err) {
        console.error("Error initializing lab:", err);
        setError("Failed to initialize lab. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (taskId || sessionId) {
      initializeLab();
    } else {
      setLoading(false);
      setError("No task selected. Please select a task from the dashboard.");
    }
  }, [taskId, sessionId]);

  const handleValidateTask = async () => {
    if (!currentTask || !validationInput.trim()) {
      setError("Please enter validation input");
      return;
    }

    try {
      setValidationLoading(true);
      setError("");

      const result = await validationAPI.validateTask(
        currentTask._id || currentTask.id,
        validationInput
      );

      setValidationResult(result);

      if (result.success) {
        // Task completed successfully
        setTimeout(() => {
          setValidationResult({
            ...result,
            message: "Task completed! Great job!",
          });
        }, 500);
      }
    } catch (err) {
      console.error("Validation error:", err);
      setValidationResult({
        success: false,
        message: err.message || "Validation failed. Please try again.",
      });
    } finally {
      setValidationLoading(false);
    }
  };

  const handleStopLab = async () => {
    if (!labSession) return;

    try {
      await labAPI.stopLab(labSession._id || labSession.id);
      setLabSession(null);
      setError("Lab stopped successfully");
    } catch (err) {
      console.error("Error stopping lab:", err);
      setError("Failed to stop lab");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-slate-300">Loading lab...</p>
        </div>
      </div>
    );
  }

  if (!currentTask && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-slate-300 text-lg">No lab loaded</p>
          <p className="text-slate-400 mt-2">
            Please select a task from the dashboard to begin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {error && !validationResult && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
          {error}
        </div>
      )}

      {validationResult && (
        <div
          className={`p-4 rounded text-sm border ${
            validationResult.success
              ? "bg-green-500/20 border-green-500/50 text-green-300"
              : "bg-red-500/20 border-red-500/50 text-red-300"
          }`}
        >
          {validationResult.message || "Validation result"}
        </div>
      )}

      {labSession && <LabHeader sessionId={labSession._id || labSession.id} />}

      {currentTask && <ProgressTracker taskId={currentTask._id || currentTask.id} />}

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">
        {/* Left Panel */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex-1 min-h-0 overflow-y-auto">
            {currentTask && (
              <TaskDescription
                title={currentTask.title}
                description={currentTask.description}
                instructions={currentTask.instructions}
                hints={currentTask.hints}
                difficulty={currentTask.difficulty}
                points={currentTask.points}
              />
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={handleValidateTask}
              disabled={validationLoading || !currentTask}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 text-slate-950 font-semibold py-2 px-4 rounded transition"
            >
              {validationLoading ? "Validating..." : "Validate Task"}
            </button>

            {labSession && (
              <button
                onClick={handleStopLab}
                className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 font-semibold py-2 px-4 rounded transition"
              >
                Stop Lab
              </button>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-2/3 min-h-[500px] flex flex-col">
          <div className="flex-1 min-h-0">
            <TerminalWindow sessionId={labSession?._id || labSession?.id} />
          </div>

          <div className="mt-4 bg-slate-800/50 border border-slate-700 rounded p-3">
            <label className="block text-sm text-slate-300 mb-2">
              Validation Input
            </label>
            <input
              type="text"
              value={validationInput}
              onChange={(e) => setValidationInput(e.target.value)}
              placeholder="Enter command or validation input"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 text-white rounded text-sm focus:outline-none focus:border-cyan-500"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleValidateTask();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabPage;