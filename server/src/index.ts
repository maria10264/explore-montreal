import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());

// Load places once at startup rather than on every request
const placesPath = path.join(__dirname, "../../data/places.json");
let places: unknown[] = [];

try {
  const raw = fs.readFileSync(placesPath, "utf-8");
  places = JSON.parse(raw);
  console.log(`Loaded ${places.length} places from data/places.json`);
} catch (err) {
  console.error("Failed to load places.json:", err);
  process.exit(1);
}

app.get("/", (_req, res) => {
  res.send("Explore Montreal API is running 🚀");
});

app.get("/api/places", (_req, res) => {
  res.json(places);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
