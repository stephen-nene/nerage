const sqlite3 = require('sqlite3').verbose();

// Connect to SQLite database
const db = new sqlite3.Database('../db/odds.db');

// Create a table to store scraped data if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS odds (
    id INTEGER PRIMARY KEY,
    home TEXT,
    away TEXT,
    odds_1 TEXT,
    odds_x TEXT,
    odds_2 TEXT
)`);

// Function to insert scraped data into database
const insertOdds = (data) => {
    const stmt = db.prepare('INSERT INTO odds (home, away, odds_1, odds_x, odds_2) VALUES (?, ?, ?, ?, ?)');
    data.forEach(match => {
        stmt.run(match.teams.home, match.teams.away, match['1'], match['x'], match['2']);
    });
    stmt.finalize();
};

module.exports = { db, insertOdds };
