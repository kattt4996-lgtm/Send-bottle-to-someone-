import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("bottles.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS bottles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipient TEXT NOT NULL,
    message TEXT NOT NULL,
    song_url TEXT,
    sender TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/bottles", (req, res) => {
    const { search } = req.query;
    try {
      let query = "SELECT * FROM bottles ORDER BY created_at DESC LIMIT 50";
      let params: any[] = [];

      if (search) {
        query = "SELECT * FROM bottles WHERE recipient LIKE ? ORDER BY created_at DESC LIMIT 50";
        params = [`%${search}%`];
      }

      const stmt = db.prepare(query);
      const bottles = stmt.all(...params);
      res.json(bottles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch bottles" });
    }
  });

  app.post("/api/bottles", (req, res) => {
    const { recipient, message, song_url, sender } = req.body;
    
    if (!recipient || !message) {
      return res.status(400).json({ error: "Recipient and message are required" });
    }

    try {
      const stmt = db.prepare(
        "INSERT INTO bottles (recipient, message, song_url, sender) VALUES (?, ?, ?, ?)"
      );
      const info = stmt.run(recipient, message, song_url || null, sender || null);
      
      const newBottle = db.prepare("SELECT * FROM bottles WHERE id = ?").get(info.lastInsertRowid);
      res.status(201).json(newBottle);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send bottle" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
