import { openDB } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

export async function createUserTable() {
  const db = await openDB();
  await db.exec(`CREATE TABLE IF NOT EXISTS User (
    idUser INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    lastName TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);
}

export async function addUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, lastName, email, password } = req.body;
    const db = await openDB();

    const existing = await db.get(`SELECT * FROM User WHERE email=?`, [email]);
    if (existing) return res.status(409).json({ error: 'Email já cadastrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      `INSERT INTO User (name, lastName, email, password) VALUES (?, ?, ?, ?)`,
      [name, lastName, email, hashedPassword]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error('Erro interno:', err.message);
    res.status(500).json({ error: 'Erro interno. Tente novamente.' });
  }
}

export async function updateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { idUser, name, lastName, email, password } = req.body;
    const db = await openDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      `UPDATE User SET name=?, lastName=?, email=?, password=? WHERE idUser=?`,
      [name, lastName, email, hashedPassword, idUser]
    );

    res.json({ message: 'Usuário atualizado com sucesso' });
  } catch (err) {
    console.error('Erro interno:', err.message);
    res.status(500).json({ error: 'Erro interno. Tente novamente.' });
  }
}

export async function deleteUser(req, res) {
  try {
    const { idUser } = req.body;
    const db = await openDB();
    await db.run(`DELETE FROM User WHERE idUser=?`, [idUser]);
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('Erro interno:', err.message);
    res.status(500).json({ error: 'Erro interno. Tente novamente.' });
  }
}

export async function loginUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const db = await openDB();
    const user = await db.get(`SELECT * FROM User WHERE email=?`, [email]);

    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha inválida' });

    const token = jwt.sign({ id: user.idUser, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login realizado com sucesso', token });
  } catch (err) {
    console.error('Erro interno:', err.message);
    res.status(500).json({ error: 'Erro interno. Tente novamente.' });
  }
}

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token ausente' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

export function getProtectedRoute(req, res) {
  res.json({ message: 'Rota protegida acessada com sucesso!', user: req.user });
}
