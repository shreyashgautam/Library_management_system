import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "../../hooks/use-toast";

export default function VenueBooking() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast(); // ✅ Importing shadcn toast

  // ✅ Get logged-in user details
  const { user } = useSelector((state) => state.auth);

  // ✅ Fetch Room Data
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5001/api/shop/rooms");
      setRooms(data);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to fetch rooms." });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Book a Room (Send User Email)
  const bookRoom = async (roomName) => {
    if (!user) {
      return toast({ variant: "destructive", title: "Login Required", description: "You must be logged in to book a room!" });
    }

    try {
      await axios.post("http://localhost:5001/api/shop/book", { 
        roomName, 
        email: user.email // Send user email
      });
      await fetchRooms();
      toast({ title: "Success", description: `Room "${roomName}" booked successfully! 📩 Check your email.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Booking Failed", description: error.response?.data?.message || "Something went wrong!" });
    }
  };

  // ✅ Release a Room
  const releaseRoom = async (roomName) => {
    try {
      await axios.post("http://localhost:5001/api/shop/release", { roomName });
      await fetchRooms();
      toast({ variant: "default", title: "Success", description: `Room "${roomName}" released successfully!` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: error.response?.data?.message || "Something went wrong!" });
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-center text-3xl font-bold mb-5">Conference Room Booking</h1>

      {loading && <p className="text-center text-lg">Loading rooms...</p>}

      <div className="grid grid-cols-2 gap-5">
        {rooms.map((room) => {
          const isDisabled = room.name === "ROOM D" || room.name === "ROOM F";

          return (
            <div key={room.name} className="p-5 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className={`font-semibold ${room.status === "occupied" ? "text-red-500" : "text-green-500"}`}>
                {room.status.toUpperCase()}
              </p>

              <div className="mt-3 space-x-2">
                {room.status === "free" ? (
                  <button
                    className={`px-4 py-2 rounded-md ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`}
                    onClick={() => bookRoom(room.name)}
                   
                  >
                    Book Room
                  </button>
                ) : (
                  <button
                    className={`px-4 py-2 rounded-md ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 text-white"}`}
                    onClick={() => releaseRoom(room.name)}
                    disabled={true}
                  >
                    Release Room
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
