const request = require('supertest');
const express = require('express');
const db = require('../db');

const app = express();
app.use(express.json());

app.get('/tasks', (req, res) => {
  try {
    const tasks = db.prepare('SELECT * FROM tasks').all();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const info = db.prepare('DELETE FROM tasks WHERE id = ?').run(id);

  if (info.changes === 0) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  res.status(204).send();
});


app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Título é obrigatório' });

  try {
    const info = db.prepare('INSERT INTO tasks (title) VALUES (?)').run(title);
    const task = { id: info.lastInsertRowid, title, completed: 0 };
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

describe('API de Tarefas', () => {
  beforeAll(() => {
    db.prepare('DELETE FROM tasks').run(); // Limpa a tabela
  });

  it('deve criar uma nova tarefa', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Estudar testes' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Estudar testes');
    expect(res.body.completed).toBe(0);
  });

  it('deve listar todas as tarefas', async () => {
    const res = await request(app).get('/tasks');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });


it('deve excluir uma tarefa existente', async () => {
  const res = await request(app)
    .post('/tasks')
    .send({ title: 'tarefa para excluir' });

  const taskId = res.body.id;
  expect(taskId).toBeDefined();

  const deleteRes = await request(app).delete(`/tasks/${taskId}`);
  console.log('Status da exclusão:', deleteRes.statusCode);
  console.log('Corpo da exclusão:', deleteRes.body);

  expect(deleteRes.statusCode).toBe(204);

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(taskId);
  expect(task).toBeUndefined();
});



});
