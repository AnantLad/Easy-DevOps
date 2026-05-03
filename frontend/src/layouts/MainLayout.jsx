import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <Sidebar />
            
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar />

                <main className="flex-1 overflow-auto p-6 bg-slate-950">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;