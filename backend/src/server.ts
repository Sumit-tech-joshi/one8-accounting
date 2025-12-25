import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.route";


const app = express();
app.use(cors());
app.use(express.json());
console.log('process.env.SUPABASE_URL  =. ', process.env.SUPABASE_URL)
app.use("/api", contactRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API running on ${PORT}`));