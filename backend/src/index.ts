import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import router from "./router";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || null;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
  })
);
app.use(express.json());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));

const server = http.createServer(app);
server.listen(PORT, (err?: Error) => {
  if (err) {
    console.error("Error starting server:", err);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
  console.log(error);
});

app.use("/", router());
