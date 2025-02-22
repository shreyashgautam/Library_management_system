
import React, { useState } from "react";


function ShoppingTour()
{
  const [currentTour, setCurrentTour] = useState("https://panoraven.com/en/embed/O4tIdetHmB"); // Default view

  const scenes = [
    { name: "Entrance", link: "https://panoraven.com/en/embed/O4tIdetHmB" },
    { name: "Fiction Section", link: "https://panoraven.com/en/embed/O4tIdetHmB" },
    { name: "Study Area", link: "https://panoraven.com/en/embed/O4tIdetHmB" },
  ];
  return (
    <div className="flex flex-col items-center mt-5">
      <h1 className="text-3xl font-bold mb-3">📚 Virtual Library Tour</h1>

      {/* 360° View */}
      <iframe
        src={currentTour}
        width="100%"
        height="500px"
        allowFullScreen
        title="Virtual Library Tour"
        className="rounded-lg shadow-lg"
      ></iframe>

      {/* Buttons for Navigation */}
      <div className="flex mt-5 space-x-4">
        {scenes.map((scene) => (
          <button
            key={scene.name}
            onClick={() => setCurrentTour(scene.link)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {scene.name}
          </button>
        ))}
      </div>
    </div>
  );
}
export default ShoppingTour;