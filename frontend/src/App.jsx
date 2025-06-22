import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import Notification from './components/Notification';
import './App.css';

const API_BASE_URL = 'http://localhost:5001';

function App() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');

  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success', duration = 3000) => {
    setNotification({ message, type });
    if (duration) {
      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, duration);
    }
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api`)
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error('Error fetching welcome message:', error);
        showNotification('Error to fetch welcome message.', 'error');
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tasks`)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        showNotification('Error to fetch tasks.', 'error');
      });
  }, []);

  const handleAddTask = (title) => {
    fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error adding task: ${response.statusText}`);
        }
        return response.json();
      })
      .then((addedTask) => {
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        showNotification('Task added successfully!', 'success');
      })
      .catch((error) => {
        console.error(`Error adding task: ${error.message}`);
        showNotification(error.message || 'Error to add task.', 'error');
      });
  };

  const handleToggleComplete = (taskId) => {
    fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'PUT',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error to update task completion: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((updatedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((taskItem) =>
            taskItem.id === updatedTask.id ? updatedTask : taskItem
          )
        );
      })
      .catch((error) => {
        console.error(`Error toggling task completion: ${error.message}`);
        showNotification(
          error.message || 'Error to update task completion.',
          'error'
        );
      });
  };

  const handleDeleteTask = (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    fetch(`${API_BASE_URL}/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok && response.status !== 204) {
          throw new Error(`Error to delete task: ${response.statusText}`);
        }
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        console.log(data?.message || 'Task deleted successfully.');
        setTasks((prevTasks) =>
          prevTasks.filter((taskItem) => taskItem.id !== taskId)
        );
        showNotification('Task deleted successfully.', 'success');
      })
      .catch((error) => {
        console.error(`Error deleting task: ${error.message}`);
        showNotification(error.message || 'Error to eliminate task.', 'error');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestor de Tareas</h1>
        <p>Backend dice: {message}</p>

        <Notification message={notification.message} type={notification.type} />

        <AddTaskForm onAddTask={handleAddTask} />

        <h2>Lista de Tareas</h2>
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      </header>
    </div>
  );
}

export default App;
