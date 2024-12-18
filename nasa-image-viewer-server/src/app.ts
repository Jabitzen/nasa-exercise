import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import imagesRouter from "./routes/images";
import cors from "cors";

dotenv.config();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api/images", imagesRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const shutdown = () => {
  console.log("\nServer shutting down...");

  server.close(() => {
    console.log("Server closed. Port released.");
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forcing shutdown...");
    process.exit(1);
  }, 10000);
};

process.on("SIGINT", () => {
  console.log("Received SIGINT (Ctrl+C)");
  shutdown();
});

process.on("SIGTERM", () => {
  console.log("Received SIGTERM");
  shutdown();
});
