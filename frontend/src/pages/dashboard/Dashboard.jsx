import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { taskAPI, progressAPI } from "../../services/api";
import StatsCard from "../../components/dashboard/StatsCard";
import CourseCard from "../../components/dashboard/CourseCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tasksResponse, progressResponse] = await Promise.all([
          taskAPI.getAllTasks(),
          progressAPI.getUserProgress(),
        ]);

        // Extract data from response structure { success, message, data, timestamp }
        const tasks = tasksResponse.data?.tasks || [];
        const progress = progressResponse.data || progressResponse;

        setTasks(tasks);
        setProgress(progress);
        setError("");
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load dashboard data");
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
          <p className="text-slate-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome Back, {user?.username || "User"}
        </h1>
        <p className="text-slate-400 mt-2">
          Continue your DevOps learning journey.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded text-red-300">
          {error}
        </div>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          title="Labs Completed"
          value={progress?.labsCompleted || 0}
        />

        <StatsCard title="Total Score" value={progress?.totalScore || 0} />

        <StatsCard title="Tasks Completed" value={progress?.tasksCompleted || 0} />
      </div>

      {/* Tasks Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Available Tasks</h2>

        {tasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400">No tasks available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tasks.map((task) => (
              <CourseCard
                key={task._id || task.id}
                id={task._id || task.id}
                title={task.title}
                description={task.description}
                level={task.difficulty}
                category={task.category}
                points={task.points}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;