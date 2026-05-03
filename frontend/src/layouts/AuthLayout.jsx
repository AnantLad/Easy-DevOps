const AuthLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
            {children}
        </div>
    );
};

export default AuthLayout;