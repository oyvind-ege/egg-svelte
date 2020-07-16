const app = require('./server');

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`App started and available at http://localhost:${PORT}`);
});
