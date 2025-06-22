import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please add a title for the task');
      return;
    }
    onAddTask(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title to the new task"
        style={{
          marginRight: '10px',
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="submit "
        style={{
          padding: '8px 15px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#28a745',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
