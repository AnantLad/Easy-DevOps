import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let result;
      if (isSignup) {
        result = await signup(email, password, username);
      } else {
        result = await login(email, password);
      }

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError("");
  };

  return (
    <div className="w-full max-w-md bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-2xl">
      <h2 className="text-3xl font-bold mb-2 text-cyan-400 text-center">
        {isSignup ? "Create Account" : "Login"}
      </h2>
      
      <p className="text-slate-400 text-center text-sm mb-6">
        {isSignup 
          ? "Join Easy DevOps and start learning" 
          : "Welcome back to Easy DevOps"}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {isSignup && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required={isSignup}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/50 active:bg-cyan-700 text-slate-950 font-semibold py-2 px-4 rounded transition duration-200 transform hover:scale-105 disabled:hover:scale-100"
        >
          {isLoading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-700">
        <p className="text-slate-400 text-center text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium transition"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;