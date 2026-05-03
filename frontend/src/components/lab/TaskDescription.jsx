import { useState } from "react";

const TaskDescription = ({
  title,
  description,
  instructions,
  hints,
  difficulty,
  points,
}) => {
  const [showHints, setShowHints] = useState(false);

  const getDifficultyColor = (diff) => {
    const colors = {
      "Beginner": "bg-green-500/20 text-green-400",
      "Intermediate": "bg-yellow-500/20 text-yellow-400",
      "Advanced": "bg-red-500/20 text-red-400",
    };
    return colors[diff] || "bg-slate-800 text-slate-300";
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-white">
          {title || "Task Description"}
        </h2>
        
        <div className="flex gap-2 flex-wrap">
          {difficulty && (
            <span className={`text-xs px-3 py-1 rounded ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          )}
          {points && (
            <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded text-cyan-400">
              {points} points
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-slate-200">
            Overview
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {description}
          </p>
        </div>
      )}

      {/* Instructions */}
      {instructions && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-slate-200">
            Instructions
          </h3>
          <div className="space-y-2">
            {Array.isArray(instructions) ? (
              instructions.map((instruction, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 text-xs text-cyan-400 font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-slate-300 pt-0.5">{instruction}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-300">{instructions}</p>
            )}
          </div>
        </div>
      )}

      {/* Hints */}
      {hints && hints.length > 0 && (
        <div className="border-t border-slate-700 pt-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition mb-3"
          >
            <span>{showHints ? "▼" : "▶"}</span>
            {hints.length} Hint{hints.length !== 1 ? "s" : ""} Available
          </button>

          {showHints && (
            <div className="space-y-2">
              {hints.map((hint, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 border border-slate-700 rounded p-3 text-sm"
                >
                  <p className="text-slate-300">
                    <span className="font-semibold text-cyan-400">
                      Hint {index + 1}:
                    </span>{" "}
                    {hint}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;