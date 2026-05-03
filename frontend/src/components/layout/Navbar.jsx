import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center px-6 shadow-lg">
            <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
                Easy DevOps
            </h1>
            <div className="ml-auto flex items-center space-x-6">
                {user && (
                    <span className="text-sm text-slate-400">
                        {user.username}
                    </span>
                )}
                <button 
                    onClick={handleLogout}
                    className="text-slate-300 hover:text-cyan-400 transition font-medium text-sm"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Navbar;