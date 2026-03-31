import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import router from "./adminRoutes/adminRout.js";
import reportRoutes from "./adminRoutes/reportRoutes.js";
import categoryRoutes from "./adminRoutes/categoryRoutes.js";

import cors from "cors";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://hospital-website-green.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// routes
app.use("/api/admin", router);
app.use("/uploads", express.static("uploads"));

app.use("/api/reports", reportRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});