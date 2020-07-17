const express = require('express');
const fs = require('fs');
const util = require('util');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();
const read = util.promisify(fs.readFile);

const handleRemoteResponseStatus = (response, result, successFunc) => {
  if (result.status === 404) return response.status(404).send();
  if (result.status === 422) return response.status(422).send({ status: 'fail', data: { message: 'Please provide correct data.' } });
  if (result.status === 500) return response.status(503).send();
  return successFunc(response, result);
};

router.get('/', (req, res) => {
  res.status(404)
    .send({ status: 'fail' });
});

router.get('/elevations/:lat/:lon', async (req, res) => {
  const result = await axios.get(`https://elevation-api.io/api/elevation?points=(${req.params.lat},${req.params.lon})&key=${process.env.ELEVATION_API_KEY}`);
  handleRemoteResponseStatus(res, result, () => {
    const finalElevation = result.data.elevations[0].elevation;
    return res.send({ status: 'success', data: { elevation: finalElevation } });
  });
});

router.get('/cities/:lat/:lon', async (req, res) => {
  const result = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${req.params.lat}+${req.params.lon}&key=${process.env.OPENCAGE_API_KEY}`);
  handleRemoteResponseStatus(res, result, () => res.send({ status: 'success', data: result.results.components.city }));
});

router.get('/regions', async (req, res) => {
  const eggData = JSON.parse(await read((path.join(__dirname, '../data/eggs.json'))));
  if (!eggData) return res.status(500).send();

  return res.status(200)
    .send({ status: 'success', data: eggData });
});

module.exports = router;
