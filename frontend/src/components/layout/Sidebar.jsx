import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:block min-h-screen">
            <div className="p-6 space-y-2">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
                    Menu
                </h3>

                <Link
                    to="/dashboard"
                    className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition font-medium"
                >
                    Dashboard
                </Link>

                <Link
                    to="/labs"
                    className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition font-medium"
                >
                    Labs
                </Link>

                <Link
                    to="/progress"
                    className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition font-medium"
                >
                    Progress
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;