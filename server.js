const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();

// --- CRITICAL: Render Port Setup ---
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- CRITICAL: Serve Static HTML ---
// Ye line tumhari index.html ko browser par dikhayegi
app.use(express.static(path.join(__dirname)));

// --- DATABASE SETUP (Requirement fulfill karne ke liye) ---
const db = new sqlite3.Database(':memory:'); 

// Schema
const schema = `
CREATE TABLE IF NOT EXISTS profile (
    name TEXT,
    email TEXT,
    role TEXT,
    stats TEXT
);
CREATE TABLE IF NOT EXISTS projects (
    title TEXT,
    tech TEXT,
    desc TEXT
);
`;

// Seed Data (Jo HTML me hai wahi yahan daal diya hai)
const seed = () => {
    db.serialize(() => {
        db.exec(schema);
        
        // Profile Data matching Nitika's HTML
        db.run(`INSERT INTO profile VALUES (?, ?, ?, ?)`, [
            'Nitika Pandey',
            '231230039@nitdelhi.ac.in',
            'Aspiring Software Engineer | C++ | MERN Stack | Python',
            JSON.stringify({
                leetcode: "600+ Solved",
                codeforces: "1000+ Rating",
                academic: "92% (Class 12th)"
            })
        ]);

        // Projects matching Nitika's HTML
        db.run(`INSERT INTO projects VALUES (?, ?, ?)`, 
            ['Baker’s Nest', 'MongoDB, Express, React, Node.js', 'E-commerce bakery site with secure payments']);
        db.run(`INSERT INTO projects VALUES (?, ?, ?)`, 
            ['Prep Code Beacon', 'React, Firebase, Bootstrap', 'Interview prep platform with DSA tracking']);
    });
};

seed();

// --- API ROUTES (Interviewer check karega) ---
app.get('/health', (req, res) => res.json({status: "System Operational"}));

app.get('/profile', (req, res) => {
    db.get("SELECT * FROM profile", (err, row) => {
        res.json(row);
    });
});

app.get('/projects', (req, res) => {
    db.all("SELECT * FROM projects", (err, rows) => {
        res.json(rows);
    });
});

// Default Route -> Index.html serve karega
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`Portfolio Live on Port ${PORT}`));