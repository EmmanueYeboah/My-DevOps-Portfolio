import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/users`, { name, email });
      setName('');
      setEmail('');
      fetchUsers();
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Portfolio Project</h1>
        <p>Full-stack app with S3 storage, containerized deployment, and monitoring</p>
      </header>

      <main className="App-main">
        <section className="user-form">
          <h2>Add User</h2>
          <form onSubmit={addUser}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add User'}
            </button>
          </form>
        </section>

        <section className="user-list">
          <h2>Users ({users.length})</h2>
          {users.length === 0 ? (
            <p>No users found. Add some users above!</p>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <small>Added: {new Date(user.createdAt).toLocaleDateString()}</small>
                  <button 
                    onClick={() => deleteUser(user.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="tech-stack">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h4>Frontend</h4>
              <p>React.js, Nginx</p>
            </div>
            <div className="tech-item">
              <h4>Backend</h4>
              <p>Node.js, Express</p>
            </div>
            <div className="tech-item">
              <h4>Storage</h4>
              <p>AWS S3</p>
            </div>
            <div className="tech-item">
              <h4>Infrastructure</h4>
              <p>AWS ECS, Terraform</p>
            </div>
            <div className="tech-item">
              <h4>CI/CD</h4>
              <p>GitHub Actions</p>
            </div>
            <div className="tech-item">
              <h4>Monitoring</h4>
              <p>Prometheus, Grafana</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;