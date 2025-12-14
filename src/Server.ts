import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import multer from "multer";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://https://pr2-socket-server.onrender.com",
  "https://annutamilarasu.github.io",
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create HTTP server first
const server = http.createServer(app);

// Create Socket.IO instance
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

// NOW define routes (after io is created)
app.get("/", (_req, res) => {
  res.json({ 
    message: "Socket.IO server is running", 
    status: "ok",
    timestamp: new Date().toISOString(),
    connections: io.engine.clientsCount
  });
});

app.post("/upload", upload.single("picture"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    const fileContent = req.file.buffer.toString("utf-8");
    console.log("📄 File uploaded:", req.file.originalname);

    res.json({
      message: `Read file ${req.file.originalname} successfully!`,
      content: fileContent,
    });
  } catch (error) {
    console.error("Error reading file:", error);
    res.status(500).json({ message: "Error reading file" });
  }
});

// Socket.IO connection handling
io.on("connection", (socket: Socket) => {
  console.log("🟢 New client connected:", socket.id);

  socket.on("codeUpdate", (newCode: string) => {
    console.log("📝 codeUpdate from:", socket.id);
    socket.broadcast.emit("codeUpdate", newCode);
  });

  socket.on("createFile", (newFile: string) => {
    console.log("📄 createFile from:", socket.id);
    socket.broadcast.emit("fileCreated", newFile);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});