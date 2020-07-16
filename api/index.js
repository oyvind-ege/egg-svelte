const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const read = util.promisify(fs.readFile);

router.get('/', (req, res) => {
  res.status(404)
    .send({ status: 'fail' });
});

router.get('/elevations/:lat/:lon', async (req, res) => {
  const result = await axios.get(`https://elevation-api.io/api/elevation?points=(${req.params.lat},${req.params.lon})&key=${process.env.ELEVATION_API_KEY}`);
  const finalElevation = result.data.elevations[0].elevation;
  res.send({ status: 'success', data: { elevation: finalElevation } });
});

router.get('/regions', async (req, res) => {
  const eggData = JSON.parse(await read((path.join(__dirname, '../data/eggs.json'))));
  res.status(200)
    .send({ status: 'success', data: eggData });
});

module.exports = router;
