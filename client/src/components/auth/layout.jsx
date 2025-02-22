import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import sss1 from "../../assets/sss1.png"; 
import sss2 from "../../assets/sss2.png"; 
import sss3 from "../../assets/sss3.png"; 

import VITLOGO from "../../assets/vitlo.png"; 
function AuthLayout() {
    const [show, setShow] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const images = [sss1, sss2, sss3];

    useEffect(() => {
        setTimeout(() => setShow(true), 1000);

        // Image rotation logic
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    return (
        <div className={`flex min-h-screen w-full transition-opacity duration-1000 ${show ? "opacity-100" : "opacity-0"} font-[Inter]"`}>
            
            {/* Left Side - Welcome Section */}
            <div className={`hidden lg:flex flex-col items-center justify-center bg-[#D4A373] w-1/2 px-12 transform transition-transform duration-1000 ${show ? "translate-x-0" : "-translate-x-10"}`}>
                <img src={VITLOGO} alt=""  width={150}/>
                {/* Text & Title */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl font-bold tracking-tight text-[#432818] hover:scale-105 transition-all duration-300 font-serif">
                        INTELLILIB <br /> <span className="text-3xl">VIT CHENNAI</span>
                    </h1>
                </div>

                {/* Rotating Image Section with Fade Effect */}
                <div className="relative mt-6 w-80 h-80">
                    {images.map((img, index) => (
                        <img 
                            key={index} 
                            src={img} 
                            alt="Library" 
                            className={`absolute rounded-lg w-full h-full object-cover transition-opacity duration-1000 ease-in-out 
                            ${imageIndex === index ? "opacity-100 scale-105" : "opacity-0 scale-95"}`}
                        />
                    ))}
                </div>
                
            </div>

            {/* Right Side - Login/Register Forms */}
            <div className={`flex flex-1 items-center justify-center bg-[#FEFAE0] px-6 py-12 transform transition-transform duration-1000 ${show ? "translate-x-0" : "translate-x-10"}`}>
                <div className="w-full max-w-md p-6 cursor-pointer shadow-lg rounded-lg transition-transform duration-300 hover:shadow-2xl">
                    <Outlet />
                </div>
            </div>
      
        </div>
    );
}

export default AuthLayout;
