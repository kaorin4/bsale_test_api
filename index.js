const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const port = process.env.PORT || 5000;

app.use(cors());

dotenv.config();

app.get('/', (req, res) => {
  res.send('BSALE TEST API');
});

const categoryRoute = require('./routes/categoryRoute');

app.use('/api/categories', categoryRoute);

app.listen(port, () => {
  console.log("Server running on port", port);
});
