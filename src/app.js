const express = require('express');
const cors = require('cors');
const aiRoutes = require('./routes/ai.routes');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Code Reviewer Backend!');
});

app.use('/ai', aiRoutes);

module.exports = app;
