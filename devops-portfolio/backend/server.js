const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// AWS S3 configuration
const s3 = new AWS.S3({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'devops-portfolio-data';
const USERS_KEY = 'data/users.json';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

// S3 Helper Functions
async function getUsers() {
  try {
    const params = { Bucket: BUCKET_NAME, Key: USERS_KEY };
    const data = await s3.getObject(params).promise();
    return JSON.parse(data.Body.toString());
  } catch (err) {
    if (err.code === 'NoSuchKey') {
      return [];
    }
    throw err;
  }
}

async function saveUsers(users) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: USERS_KEY,
    Body: JSON.stringify(users, null, 2),
    ContentType: 'application/json'
  };
  await s3.putObject(params).promise();
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",status="200"} 42
# HELP app_info Application information
# TYPE app_info gauge
app_info{version="1.0.0",service="backend",storage="s3"} 1
  `);
});

// API Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const users = await getUsers();
    
    // Check if email already exists
    if (users.find(user => user.email === email)) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await saveUsers(users);
    
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const users = await getUsers();
    const userIndex = users.findIndex(user => user.id === id);
    
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    await saveUsers(users);
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Using S3 bucket: ${BUCKET_NAME}`);
});