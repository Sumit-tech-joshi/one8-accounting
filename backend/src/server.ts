import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.route";

const app = express();

app.use(
  cors({
    origin: [
      "https://one8accounting.com",
      "https://www.one8accounting.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());


app.use(express.json());
app.use("/api", contactRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on ${PORT}`));