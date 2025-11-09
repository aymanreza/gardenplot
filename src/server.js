import express from 'express';
import mysql from 'mysql2/promise';
import { Connector } from '@google-cloud/cloud-sql-connector';


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

app.get('/healthz', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json(rows[0]);
  } catch (e) {
	  console.error('healthz error:', e);
	  res.status(500).json({code: e.code, message: e.sqlMessage || e.message});
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/emails', async (_req, res) => {
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

process.on('SIGINT', async () => {
  await pool.end();
  connector.close();
  process.exit(0);
});

