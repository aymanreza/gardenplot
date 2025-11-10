import express from 'express';
import mysql from 'mysql2/promise';
import { Connector } from '@google-cloud/cloud-sql-connector';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);


const connector = new Connector();

const clientOpts = await connector.getOptions({
  instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
});

const pool = mysql.createPool({
  ...clientOpts,
  user: process.env.DB_USER,   
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,   
  waitForConnections: true,
  connectionLimit: 5
});

const app = express();

// health
app.get('/api/healthz', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json(rows[0]);                // { ok: 1 }
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.sqlMessage || e.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/api/tables', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT TABLE_NAME AS name
       FROM INFORMATION_SCHEMA.TABLES
       WHERE TABLE_SCHEMA = ?
       ORDER BY TABLE_NAME`,
      [process.env.DB_NAME]
    );
    res.json(rows.map(r => r.name));
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.sqlMessage || e.message });
  }
});

app.get('/api/tables/:name/rows', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit ?? '20', 10) || 20, 500);
    const table = req.params.name;
    const [rows] = await pool.query(`SELECT * FROM \`${table}\` LIMIT ?`, [limit]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ code: e.code, message: e.sqlMessage || e.message });
  }
});

app.get('/api/emails', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT email FROM `users` LIMIT 15'
    );
    res.json(rows.map(r => r.email));
  } catch (e) {
    console.error('emails error:', e);
    res.status(500).json({ code: e.code, message: e.sqlMessage || e.message });
  }
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (_req, res) =>
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
);


process.on('SIGINT', async () => {
  await pool.end();
  connector.close();
  process.exit(0);
});

