import { useEffect, useState } from "react";
import { progressAPI } from "../../services/api";

const ProgressTracker = ({ taskId }) => {
  const [progress, setProgress] = useState(0);
  const [taskProgress, setTaskProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const userProgress = await progressAPI.getUserProgress();
        
        if (userProgress && userProgress.taskProgress) {
          const currentTaskProgress = userProgress.taskProgress.find(
            (tp) => tp.taskId === taskId
          );
          
          if (currentTaskProgress) {
            setTaskProgress(currentTaskProgress);
            const percentage = currentTaskProgress.maxScore
              ? (currentTaskProgress.score / currentTaskProgress.maxScore) * 100
              : 0;
            setProgress(percentage);
          }
        }
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchProgress();
    }
  }, [taskId]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-slate-300 text-sm font-medium">Progress</span>
          {taskProgress && (
            <p className="text-xs text-slate-400 mt-1">
              {taskProgress.attempts} {taskProgress.attempts === 1 ? "attempt" : "attempts"}
            </p>
          )}
        </div>

        <span className="text-slate-300 font-semibold">
          {!loading && taskProgress 
            ? `${taskProgress.score}/${taskProgress.maxScore} pts` 
            : `${Math.round(progress)}%`}
        </span>
      </div>

      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-3 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {taskProgress && (
        <div className="mt-3 text-xs text-slate-400">
          <p>Completed: {taskProgress.completed ? "✓ Yes" : "✗ No"}</p>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;