const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');

const router = express.Router();
const read = util.promisify(fs.readFile);

router.get('/', (req, res) => {
  res.status(404)
    .send({ status: 'fail' });
});

router.get('/regions', async (req, res) => {
  const eggData = JSON.parse(await read((path.join(__dirname, '../data/eggs.json'))));
  res.status(200)
    .send({ status: 'success', data: eggData });
});

module.exports = router;
