import React from 'react';

function TaskItem({ task, onToggleComplete, onDeleteTask }) {
  const itemStyle = {
    opacity: task.completed ? 0.7 : 1,
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    padding: '10px',
    border: '1px solid #eee',
    borderRadius: '4px',
    backgroundColor: task.completed ? '#f0f0f0' : '#fff',
  };

  const titleStyle = {
    flexGrow: 1,
    marginRight: '10px',
    color: '#333333',
    TextDecoration: 'none',
  };

  const buttonStyle = {
    padding: '5px 10px',
    fontSize: '0.9em',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <li style={itemStyle}>
      <span
        className={`custom-checkbox ${task.completed ? 'completed' : ''}`}
        onClick={() => onToggleComplete(task.id)}
      >
        {task.completed ? '✔' : ''}
      </span>
      <span style={titleStyle} onClick={() => onToggleComplete(task.id)}>
        {task.title}
      </span>
      <button onClick={() => onDeleteTask(task.id)} style={buttonStyle}>
        Eliminar
      </button>
    </li>
  );
}

export default TaskItem;
