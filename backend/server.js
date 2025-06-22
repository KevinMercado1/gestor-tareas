const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

const TASKS_FILE_PATH = path.join(__dirname, 'tasks.json');

const readTasksFromFile = () => {
  try {
    if (fs.existsSync(TASKS_FILE_PATH)) {
      const data = fs.readFileSync(TASKS_FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading tasks from file:', error);
  }
  return [];
};

const writeTasksToFile = (tasksData) => {
  try {
    fs.writeFileSync(
      TASKS_FILE_PATH,
      JSON.stringify(tasksData, null, 2),
      'utf8'
    );
  } catch (error) {
    console.error('Error writing tasks to file:', error);
  }
};

let tasks = readTasksFromFile();

app.use(cors());
app.use(express.json());

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };

  if (!newTask.title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  tasks.push(newTask);
  writeTasksToFile(tasks);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  writeTasksToFile(tasks);
  res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  tasks = tasks.filter((t) => t.id !== taskId);
  writeTasksToFile(tasks);
  res.status(204).send();
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
  console.log(`Tasks will be stored in ${TASKS_FILE_PATH}`);
});
