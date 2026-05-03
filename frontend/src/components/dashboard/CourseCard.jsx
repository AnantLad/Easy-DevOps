import { useNavigate } from "react-router-dom";
import Card from "../common/Card";

const CourseCard = ({
    id,
    title,
    description,
    level,
    category,
    points,
}) => {
    const navigate = useNavigate();

    const handleStartLab = () => {
        navigate(`/labs?taskId=${id}`);
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            "Beginner": "bg-green-500/20 text-green-400",
            "Intermediate": "bg-yellow-500/20 text-yellow-400",
            "Advanced": "bg-red-500/20 text-red-400",
        };
        return colors[difficulty] || "bg-slate-800 text-slate-300";
    };

    return(
        <Card className="hover:border-cyan-500 transition cursor-pointer">
            <h2 className="text-xl font-semibold text-white">
                {title}
            </h2>

            <p className="text-slate-400 mt-2 text-sm">
                {description}
            </p>

            <div className="mt-4 flex flex-col gap-3">
                <div className="flex gap-2">
                    <span className={`text-xs px-3 py-1 rounded ${getDifficultyColor(level)}`}>
                        {level}
                    </span>
                    {category && (
                        <span className="text-xs bg-slate-800 px-3 py-1 rounded text-slate-300">
                            {category}
                        </span>
                    )}
                    {points && (
                        <span className="text-xs bg-cyan-500/20 px-3 py-1 rounded text-cyan-400 ml-auto">
                            {points} pts
                        </span>
                    )}
                </div>
                
                <button 
                    onClick={handleStartLab}
                    className="w-full bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 px-4 py-2 rounded font-medium text-slate-950 transition"
                >
                    Start Task
                </button>
            </div>
        </Card>
    );
};

export default CourseCard;