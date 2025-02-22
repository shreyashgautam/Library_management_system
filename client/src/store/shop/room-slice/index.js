import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Initial state
const initialState = {
    rooms: [],
    loading: false,
    error: null,
};

// ✅ Fetch Rooms
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
    const { data } = await axios.get("http://localhost:5001/api/shop/rooms");
    return data;
});

// ✅ Book a Room
export const bookRoom = createAsyncThunk("rooms/bookRoom", async (roomName, { rejectWithValue }) => {
    try {
        await axios.post("http://localhost:5001/api/shop/book", { roomName });
        return roomName; // Return booked room name
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

// ✅ Release a Room
export const releaseRoom = createAsyncThunk("rooms/releaseRoom", async (roomName) => {
    await axios.post("http://localhost:5001/api/shop/release", { roomName });
    return roomName; // Return released room name
});

// ✅ Create Slice
const roomSlice = createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(bookRoom.fulfilled, (state, action) => {
                const room = state.rooms.find((r) => r.name === action.payload);
                if (room) room.status = "occupied"; // Update state directly
            })
            .addCase(releaseRoom.fulfilled, (state, action) => {
                const room = state.rooms.find((r) => r.name === action.payload);
                if (room) room.status = "free"; // Update state directly
            })
            .addCase(bookRoom.rejected, (state, action) => {
                state.error = action.payload; // Store error message
            });
    },
});

// ✅ Export reducer
export default roomSlice.reducer;
