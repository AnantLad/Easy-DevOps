import { useState, useEffect } from "react";
import { progressAPI, scoreAPI } from "../../services/api";

const Progress = () => {
  const [progress, setProgress] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userProgressResponse, leaderboardResponse] = await Promise.all([
          progressAPI.getUserProgress(),
          progressAPI.getLeaderboard(),
        ]);

        // Extract data from response structure { success, message, data, timestamp }
        const progress = userProgressResponse.data || userProgressResponse;
        const leaderboard = leaderboardResponse.data?.leaderboard || [];

        setProgress(progress);
        setLeaderboard(leaderboard);
        setError("");
      } catch (err) {
        console.error("Error fetching progress:", err);
        setError("Failed to load progress data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
          <p className="text-slate-300">Loading progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Your Progress</h2>
        <p className="text-slate-400">Track your learning journey</p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded text-red-300">
          {error}
        </div>
      )}

      {/* Progress Stats */}
      {progress && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Tasks Completed</p>
            <p className="text-3xl font-bold text-cyan-400">
              {progress.tasksCompleted || 0}
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Total Score</p>
            <p className="text-3xl font-bold text-cyan-400">
              {progress.totalScore || 0}
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Labs Completed</p>
            <p className="text-3xl font-bold text-cyan-400">
              {progress.labsCompleted || 0}
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-2">Rank</p>
            <p className="text-3xl font-bold text-cyan-400">
              {progress.rank || "N/A"}
            </p>
          </div>
        </div>
      )}

      {/* Task Progress */}
      <div>
        <h3 className="text-xl font-bold mb-4">Task Progress</h3>
        {progress?.taskProgress && progress.taskProgress.length > 0 ? (
          <div className="space-y-3">
            {progress.taskProgress.map((task) => (
              <div
                key={task.taskId}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-white">{task.taskTitle}</p>
                    <p className="text-sm text-slate-400">
                      Category: {task.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-semibold">
                      {task.score}/{task.maxScore} pts
                    </p>
                    <p className="text-sm text-slate-400">
                      {task.attempts} {task.attempts === 1 ? "attempt" : "attempts"}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${task.maxScore ? (task.score / task.maxScore) * 100 : 0}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400">No task progress yet. Start a task!</p>
          </div>
        )}
      </div>

      {/* Leaderboard */}
      <div>
        <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
        {leaderboard && leaderboard.length > 0 ? (
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-300">
                      Tasks Completed
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.userId} className="hover:bg-slate-700/50">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-semibold">
                          {index + 1}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">
                        {entry.username}
                      </td>
                      <td className="px-4 py-3 text-cyan-400 font-semibold">
                        {entry.totalScore}
                      </td>
                      <td className="px-4 py-3 text-slate-300">
                        {entry.labsCompleted || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400">Leaderboard data not available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;