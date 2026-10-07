import { useEffect } from 'react';
import { Outlet } from 'react-router';
import Aside from '../Aside/Aside';
import AiChatbot from '../AiChatbot/AiChatbot';

const DashboardLayout = () => {

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    return (
        <div className="min-h-screen bg-base-200 relative">
            <div className="flex relative z-10">
                <Aside />
                <main className="flex-1 min-w-0 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
            <AiChatbot />
        </div>
    );
};

export default DashboardLayout;