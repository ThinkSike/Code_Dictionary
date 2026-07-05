// index.js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// --- In-memory "database"
let nextId = 3;
let movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "The Godfather", director: "Francis Ford Coppola", year: 1972 },
];

// --- Health check
app.get("/", (req, res) => {
  res.send("Hollywood Movies API is running");
});

// --- CRUD for /api/movies

// Create
app.post("/api/movies", (req, res) => {
  const { title, director, year } = req.body || {};
  if (!title || !director) {
    return res.status(400).json({ error: "title and director are required" });
  }
  const movie = { id: nextId++, title, director, year: Number(year) || undefined };
  movies.push(movie);
  res.status(201).json(movie);
});

// Read all
app.get("/api/movies", (req, res) => {
  res.json(movies);
});

// Read one
app.get("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (!movie) return res.status(404).json({ error: "movie not found" });
  res.json(movie);
});

// Update (replace) - PUT
app.put("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = movies.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ error: "movie not found" });

  const { title, director, year } = req.body || {};
  if (!title || !director) {
    return res.status(400).json({ error: "title and director are required" });
  }

  movies[idx] = { id, title, director, year: Number(year) || undefined };
  res.json(movies[idx]);
});

// Partial update - PATCH
app.patch("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);
  if (!movie) return res.status(404).json({ error: "movie not found" });

  const { title, director, year } = req.body || {};
  if (title !== undefined) movie.title = title;
  if (director !== undefined) movie.director = director;
  if (year !== undefined) movie.year = Number(year) || undefined;

  res.json(movie);
});

// Delete
app.delete("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = movies.length;
  movies = movies.filter((m) => m.id !== id);

  if (movies.length === before) {
    return res.status(404).json({ error: "movie not found" });
  }

  res.status(204).send(); // no content
});

// --- Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
