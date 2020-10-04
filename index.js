const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// middleware
app.use(express.json());
app.use(cors());

// Server static content inside build folder
app.use(express.static(path.join(__dirname, 'client/build')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/dashboard', require('./routes/api/dashboard'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
