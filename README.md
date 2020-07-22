# egg-svelte
The project consists of a clientside, using Svelte, and a REST API built with Express.

A one-day project built during my time at SALT. 

I chose to delve into Svelte for the first time and write a simple app that calculates the time it takes to boil an egg depending on egg-size, elevation, and temperature.

## Feature list

* Calculates the time it takes to achieve soft-boiled, medium-boiled and hard-boiled eggs depending on their size, the elevation at the user's location, and the initial temperature of the egg.
* Adds a timer with a per-second countdown, and displays time in xx:xx form. Upon reaching zero, timer will visually change to alert the user.
* Supports multiple timers.

## Building the project

The app requires the following environment variables from a .env file in the root folder:

* SERVER_PORT -- the desired server port number
* ELEVATION_API_KEY -- an API key from https://elevation-api.io/
* OPENCAGE_API_KEY -- an API key from https://opencagedata.com/api

## Formula

The boiling time formula is taken from: https://www.mn.uio.no/kjemi/tjenester/kunnskap/egg/

![alt text](https://www.mn.uio.no/kjemi/tjenester/kunnskap/egg/formel.jpg "Egg-boiling formula")

## Basic flow

Client needs two key variables to compute boiling time: egg-size, and elevation.

### Elevation

The boiling point of water is normally 100 celcius, but decreases by 0.5C for every 150m increase in altitude. This means that the time it takes for the egg yolk to reach a given temperature increases with altitude.

To solve this, we fetch the altitude of the user.

Data flow begins client side. The user consents (hopefully) to send geolocation data, which is then used in a fetch request to REST API endpoint: /elevations/:latitude/:longitude. This endpoint contacts the Elevation API (https://elevation-api.io/) and returns the elevation of that latitude and longitude to the client.

The elevation data is then fed into a client side formula. 

### Egg-size

The larger the egg, the longer the boiling time.

Egg sizes are surprisingly standardized. Europe, NA, Australia, Brazil, all have very precise standards for egg sizes.

To my knowledge, there is no publicly available API providing this data, so I added the european data to a REST API endpoint: /regions.

The client therefore fetches the egg sizes and their names from the /regions endpoint, and uses this in the formula.

## Wishlist

* A "You are here" bar that indicates the current registered location of the user
* Additional egg-sizes for different regions
* Dynamically populate the list of egg-sizes depending on the user's current region
* A more appealing look, perhaps including a visual indication of each egg: an SVG animation of an increasingly coagulating egg-yolk?
* Secure user login

