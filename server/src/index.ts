import express from "express"; // imports Express, which lets us create a web server.
import cors from "cors";//const app = express();
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("Explore Montreal API is running 🚀");
});


app.get("/api/festivals", (req, res) => {
    res.json([
        {
            name: "Festival International de Jazz de Montréal",
            location: "Place des Arts",
            month: "June-July"
        },
        {
            name: "Osheaga",
            location: "Parc Jean-Drapeau",
            month: "August"
        }
    ]);
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});