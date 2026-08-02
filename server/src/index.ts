import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Explore Montreal API is running 🚀");
});

app.get("/api/places", (req, res) => {
  const filePath = path.join(__dirname, "../../data/places.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const places = JSON.parse(raw);
  res.json(places);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});