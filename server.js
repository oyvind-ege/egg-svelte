const express = require('express');
const path = require('path');

const PORT = 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`App started and available at http://localhost:${PORT}`);
});
