const app = require('./server');
require('dotenv').config();

app.listen(process.env.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App started and available at http://localhost:${process.env.SERVER_PORT}`);
});
