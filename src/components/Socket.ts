import { io } from "socket.io-client";

// IMPORTANT: This uses environment variables
// Development: VITE_SOCKET_URL=http://localhost:4000
// Production: VITE_SOCKET_URL=https://your-render-url.onrender.com
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

console.log("🔌 Connecting to Socket.IO server:", SOCKET_URL);

export const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 10,
  timeout: 20000,
  autoConnect: true,
});

socket.on("connect", () => {
  console.log("✅ Connected to server:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Connection error:", error.message);
  console.error("Backend URL:", SOCKET_URL);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Disconnected:", reason);
  if (reason === "io server disconnect") {
    socket.connect();
  }
});

socket.on("reconnect", (attemptNumber) => {
  console.log("🔄 Reconnected after", attemptNumber, "attempts");
});

export default socket;