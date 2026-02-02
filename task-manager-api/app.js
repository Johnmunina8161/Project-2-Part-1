const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/User'); // Ensure User.js exists
const taskRoutes = require('./routes/Task'); // Ensure Task.js exists

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

// Root route — redirect to Swagger UI
app.get('/', (req, res) => {
  res.redirect('/api-docs');
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
