// import express, { Request, Response } from "express";
// import path from "path";
// import { PrismaClient } from "@prisma/client";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";
// import router from './routes/routes';
// import { handleRoomEvents } from './routes/roomCreate';
// import { uploadFile, handleFileUpload } from './routes/fileUpload'; 

// dotenv.config();
// const prisma = new PrismaClient();
// const app = express();

// const uploadsDir = path.join(__dirname, "uploads");
// app.use("/uploads", express.static(uploadsDir)); 

// app.use(cors());
// app.use(express.json());
// app.use("/api", router);

// app.post("/api/upload", uploadFile, handleFileUpload); 

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on('connection', (socket) => {
//   handleRoomEvents(socket, io);
// });



// app.get('/chatRoom/:loginMobile', async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { loginMobile } = req.params;
//     const usersDetails = await prisma.room.findMany({
//       where :{
//         // NOT:{
//         OR:[
//           {receiverMobileNumber : loginMobile},
//           {senderMobileNumber : loginMobile}
//         ],
        
//       // }
//        },
//       //  include:{
//       //   users:{
//       //     userName : true,
//       //     mobileNumber : true
//       //   }
//       //  }
//     })

//     return res.json({ usersDetails : usersDetails});
//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });



// httpServer.listen(process.env.PORT || 3000, () => {
//   console.log(`Server is running on port ${process.env.PORT || 3000}`);
// });
// import express, { Request, Response } from "express";
// import path from "path";
// import { PrismaClient } from "@prisma/client";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";
// import fs from "fs";
// import router from "./routes/routes";
// import { handleRoomEvents } from "./routes/roomCreate";
// import { uploadFile, handleFileUpload } from "./routes/fileUpload";

// dotenv.config();
// const prisma = new PrismaClient();
// const app = express();

// const uploadsDir = path.join(__dirname, "uploads");
// app.use("/uploads", express.static(uploadsDir));

// app.use(cors());
// app.use(express.json());
// app.use("/api", router);

// app.post("/api/upload", uploadFile, handleFileUpload);

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);


//   handleRoomEvents(socket, io);

//   function formatFileSize(sizeInBytes: number): string {
//     if (typeof sizeInBytes !== "number" || sizeInBytes <= 0) {
//       return "Invalid size";
//     }
//     return sizeInBytes > 1024 * 1024
//       ? (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB"
//       : (sizeInBytes / 1024).toFixed(2) + " KB";
//   }

//   socket.on("send_message", (message) => {
//     let responseMessage = "";

//     switch (message) {
//       case "1":
//         responseMessage =
//           "Help: Here are the available commands: \n2. Video Response \n3. Audio Response";
//         socket.emit("receive_message", responseMessage);
//         break;

//       case "2": {
//         responseMessage = "Video Response";
//         socket.emit("receive_message", responseMessage);

//         const videoPath = path.join(
//           __dirname,
//           "public",
//           "assets",
//           "video",
//           "video.mp4"
//         );

//         if (fs.existsSync(videoPath)) {
//           const videoStats = fs.statSync(videoPath);
//           console.log("Video file stats:", videoStats);

//           const videoSize = formatFileSize(videoStats.size);
//           console.log("Formatted video size:", videoSize);

//           socket.emit("video_metadata", {
//             name: "video.mp4",
//             size: formatFileSize(videoStats.size),
//             type: "video/mp4",
//           });

//           const videoStream = fs.createReadStream(videoPath);
//           videoStream.on("data", (chunk) => {
//             socket.emit("video_chunk", chunk);
//           });
//           videoStream.on("end", () => socket.emit("video_end"));
//         } else {
//           console.error("Video file not found at", videoPath);
//         }
//         break;
//       }

//       case "3": {
//         responseMessage = "Audio Response";
//         socket.emit("receive_message", responseMessage);

//         const audioPath = path.join(
//           __dirname,
//           "public",
//           "assets",
//           "audio",
//           "audio.mp3"
//         );

//         if (fs.existsSync(audioPath)) {
//           const audioStats = fs.statSync(audioPath);
//           console.log("Audio file stats:", audioStats);

//           const audioSize = formatFileSize(audioStats.size);
//           console.log("Formatted audio size:", audioSize);

//           socket.emit("audio_metadata", {
//             name: "audio.mp3",
//             size: formatFileSize(audioStats.size),
//             type: "audio/mp3",
//           });

//           const audioStream = fs.createReadStream(audioPath);
//           audioStream.on("data", (chunk) => {
//             socket.emit("audio_chunk", chunk);
//           });
//           audioStream.on("end", () => socket.emit("audio_end"));
//         } else {
//           console.error("Audio file not found at", audioPath);
//         }
//         break;
//       }

//       default:
//         responseMessage = "Invalid command. Please send '1' for help.";
//         socket.emit("receive_message", responseMessage);
//         break;
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });


// app.get(
//   "/chatRoom/:loginMobile",
//   async (req: Request, res: Response): Promise<any> => {
//     try {
//       const { loginMobile } = req.params;
//       const usersDetails = await prisma.room.findMany({
//         where: {
//           OR: [
//             { receiverMobileNumber: loginMobile },
//             { senderMobileNumber: loginMobile },
//           ],
//         },
//       });

//       return res.json({ usersDetails: usersDetails });
//     } catch (error) {
//       console.error("Error:", error);
//       return res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// const PORT = 3000;
// httpServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express, { Request, Response } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import router from "./routes/routes";
import { handleRoomEvents } from "./routes/roomCreate";
import { uploadFile, handleFileUpload } from "./routes/fileUpload";

dotenv.config();
const prisma = new PrismaClient();
const app = express();

const uploadsDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.post("/api/upload", uploadFile, handleFileUpload);


const httpServer1 = createServer(app);
const httpServer2 = createServer(app);


const io1 = new Server(httpServer1, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const io2 = new Server(httpServer2, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});


io1.on("connection", (socket) => {
  console.log("[Server 1] A user connected:", socket.id);

  
  handleRoomEvents(socket, io1);

  socket.on("disconnect", () => {
    console.log("[Server 1] User disconnected:", socket.id);
  });
});


io2.on("connection", (socket) => {
  console.log("[Server 2] A user connected:", socket.id);

  function formatFileSize(sizeInBytes: number): string {
    if (typeof sizeInBytes !== "number" || sizeInBytes <= 0) {
      return "Invalid size";
    }
    if (sizeInBytes < 1024) {
      return `${sizeInBytes} bytes`;
    } else if (sizeInBytes < 1024 * 1024) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  }

  socket.on("send_message", (message) => {
    let responseMessage = "";

    switch (message) {
      case "1":
        responseMessage =
          "Help: Here are the available commands: \n2. Video Response \n3. Audio Response";
        socket.emit("receive_message", responseMessage);
        break;

      case "2": {
        responseMessage = "Video Response";
        socket.emit("receive_message", responseMessage);

        const videoPath = path.join(
          __dirname,
          "public",
          "assets",
          "video",
          "video.mp4"
        );

        if (fs.existsSync(videoPath)) {
          const videoStats = fs.statSync(videoPath);
          console.log("Video file stats:", videoStats);

          const videoSize = formatFileSize(videoStats.size);
          console.log("Formatted video size:", videoSize);

          socket.emit("video_metadata", {
            name: "video.mp4",
            size: formatFileSize(videoStats.size),
            type: "video/mp4",
          });

          const videoStream = fs.createReadStream(videoPath);
          videoStream.on("data", (chunk) => {
            socket.emit("video_chunk", chunk);
          });
          videoStream.on("end", () => socket.emit("video_end"));
        } else {
          console.error("Video file not found at", videoPath);
        }
        break;
      }

      case "3": {
        responseMessage = "Audio Response";
        socket.emit("receive_message", responseMessage);

        const audioPath = path.join(
          __dirname,
          "public",
          "assets",
          "audio",
          "audio.mp3"
        );

        if (fs.existsSync(audioPath)) {
          const audioStats = fs.statSync(audioPath);
          console.log("Audio file stats:", audioStats);

          const audioSize = formatFileSize(audioStats.size);
          console.log("Formatted audio size:", audioSize);

          socket.emit("audio_metadata", {
            name: "audio.mp3",
            size: formatFileSize(audioStats.size),
            type: "audio/mp3",
          });

          const audioStream = fs.createReadStream(audioPath);
          audioStream.on("data", (chunk) => {
            socket.emit("audio_chunk", chunk);
          });
          audioStream.on("end", () => socket.emit("audio_end"));
        } else {
          console.error("Audio file not found at", audioPath);
        }
        break;
      }

      default:
        responseMessage = "Invalid command. Please send '1' for help.";
        socket.emit("receive_message", responseMessage);
        break;
    }
  });

  socket.on("disconnect", () => {
    console.log("[Server 2] User disconnected:", socket.id);
  });
});


app.get(
  "/chatRoom/:loginMobile",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const { loginMobile } = req.params;
      const usersDetails = await prisma.room.findMany({
        where: {
          OR: [
            { receiverMobileNumber: loginMobile },
            { senderMobileNumber: loginMobile },
          ],
        },
      });

      return res.json({ usersDetails: usersDetails });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

const PORT1 = 3000;
const PORT2 = 4000;

httpServer1.listen(PORT1, () => {
  console.log(`Server 1 is running on port ${PORT1}`);
});

httpServer2.listen(PORT2, () => {
  console.log(`Server 2 is running on port ${PORT2}`);
});
