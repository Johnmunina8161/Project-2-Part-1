const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/User'); 
const taskRoutes = require('./routes/Task'); 

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

// Root route — homepage for API
app.get('/', (req, res) => {
  res.json({
    message: 'Task Manager API is running 🚀',
    endpoints: {
      users: '/users',
      tasks: '/tasks',
      docs: '/api-docs'
    }
  });
});

// Port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
