# egg-svelte
An egg timer built using Svelte, integrated with Elevation API using geolocation data.


## Basic flow

The project consists of a clientside, using Svelte, and a REST API built with Express.

Client needs two key variables to compute boiling time: egg-size, and elevation.

### Elevation

The boiling point of water is normally 100 celcius, but decreases by 0.5C for every 150m increase in altitude. This means that the time it takes for the egg yolk to boil increases with altitude.

To solve this, we fetch the altitude of the user.

Data flow begins client side. The user consents (hopefully) to send geolocation data, which is then used in a fetch request to REST API endpoint: /elevations/:latitude/:longitude. This endpoint contacts the Elevation API (https://elevation-api.io/) and returns the elevation of that latitude and longitude to the client.

The elevation data is then fed into a client side formula. 

### Egg-size

The larger the egg, the longer the boiling time.

Egg sizes are surprisingly standardized. Europe, NA, Australia, Brazil, all have very precise standards for egg sizes.

To my knowledge, there is no publicly available API providing this data, so I added the european data to a REST API endpoint: /regions.

The client therefore fetches the egg sizes and their names from the /regions endpoint, and uses this in the formula.
