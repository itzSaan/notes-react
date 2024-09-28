import express from "express";
import cors from "cors";
import router from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import Note from "./model/Note.js";
import "dotenv/config";

const server = express();
const port = process.env.PORT || 8000;

await connectDB();

server.use(cors());
server.use(express.json());
server.use("/notes", router);

server.listen(port, () => console.log(`Server is running on ${port}`));
