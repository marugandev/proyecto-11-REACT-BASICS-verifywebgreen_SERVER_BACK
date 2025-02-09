require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

if (!process.env.API_BASE_URL) {
  throw new Error("Error: API_BASE_URL is not defined in .env");
}
const API_BASE_URL = process.env.API_BASE_URL;

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://proyecto-11-react-basics-verifywebgreen.vercel.app/"
      : "http://localhost:5173",
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));

app.get("/api/site", async (req, res) => {
  const url = req.query.url;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const response = await fetch(`${API_BASE_URL}/site?url=${url}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log(
    `Server Backend verifywebgreen running on: http://localhost:${PORT}`
  );
});
