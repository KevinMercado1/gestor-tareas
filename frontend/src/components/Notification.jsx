function Notifications({ message, type }) {
  if (!message) {
    return null;
  }

  const notificationStyle = {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    color: 'white',
    backgroundColor: type === 'error' ? '#dc3545' : '#28a745',
    textAling: 'center',
  };
  return <div style={notificationStyle}>{message}</div>;
}

export default Notifications;
