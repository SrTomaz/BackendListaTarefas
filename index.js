const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST", "PUT", "DELETE"] }
});

app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    res.send('API rodando! Use a rota /tasks');
  });


// GET: lista todas as tarefas
app.get('/tasks', (req, res) => {
  const tasks = db.prepare('SELECT * FROM tasks').all();
  res.json(tasks);
});

// POST: cria uma nova tarefa
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  const stmt = db.prepare('INSERT INTO tasks (title) VALUES (?)');
  const info = stmt.run(title);
  const newTask = { id: info.lastInsertRowid, title, completed: 0 };
  io.emit('new-task', newTask);
  res.status(201).json(newTask);
});

// PUT: marca como concluída
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('UPDATE tasks SET completed = 1 WHERE id = ?').run(id);
  const updatedTask = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  io.emit('update-task', updatedTask);
  res.json(updatedTask);
});

// DELETE: remove tarefa
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
   const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  io.emit('delete-task', parseInt(id));
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  res.status(204).send();
});

// WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado');
  socket.on('disconnect', () => console.log('Cliente desconectado'));
});

server.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});