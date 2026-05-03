const LabHeader = ({ sessionId, taskTitle, taskDifficulty }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div>
        <h1 className="text-2xl font-bold text-white">
          {taskTitle || "Lab Session"}
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Interactive lab environment
        </p>
      </div>

      <div className="flex gap-3 mt-4 md:mt-0">
        {taskDifficulty && (
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            taskDifficulty === "Beginner" 
              ? "bg-green-500/20 text-green-400" 
              : taskDifficulty === "Intermediate"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-red-500/20 text-red-400"
          }`}>
            {taskDifficulty}
          </div>
        )}

        {sessionId && (
          <div className="bg-slate-800/50 text-slate-300 px-4 py-2 rounded-lg text-sm">
            Session ID: <span className="text-cyan-400 font-mono">{sessionId.slice(0, 8)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabHeader;