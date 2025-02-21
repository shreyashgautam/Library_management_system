import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

function AuthLayout() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 500);
    }, []);

    return (
        <div className={`flex min-h-screen w-full transition-opacity duration-1000 ${show ? 'opacity-100' : 'opacity-0'}`}>
            {/* Left Side - Welcome Section */}
            <div
                className={`hidden lg:flex items-center justify-center bg-[#D4A373] w-1/2 px-12 transform transition-transform duration-1000 ${show ? 'translate-x-0' : '-translate-x-10'}`}
            >
                <div className="max-w-md space-y-6 text-center text-primary-forebackground transition-transform duration-700 scale-95">
                    <h1 className="text-4xl font-extrabold tracking-tight" style={{ color: "#432818" }}>
                        WELCOME TO INTELLILIB <br /> VIT CHENNAI
                    </h1>
                </div>
            </div>

            {/* Right Side - Login/Register Forms */}
            <div
                className={`flex flex-1 items-center justify-center bg-[#FEFAE0] px-4 py-12 sm:px-6 lg:px-8 transform transition-transform duration-1000 ${show ? 'translate-x-0' : 'translate-x-10'}`}
            > 
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
