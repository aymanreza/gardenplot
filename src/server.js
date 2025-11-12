import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import jwt from 'jsonwebtoken';
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

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.post('/api/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query(
      'SELECT user_id, name, email FROM users WHERE email = ? AND password = ?', [email, password]
    );
    const user = rows[0];
    if(!user) {
    	return res.status(401).json({error: 'invalid email and password'});
    }
    const payload = {user_id: user.user_id, name: user.name, email: user.email};
    const token = jwt.sign(payload, 'SECRET_KEY');
    res.json({token, user: payload});
  } catch (e) {
    res.status(500).json({code: e.code, message: e.sqlMessage || e.message });
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

