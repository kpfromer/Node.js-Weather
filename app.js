"use strict";

const weather = require("./weather");

const argument = process.argv.slice(2).join("_").replace(' ', '_');

weather.getTemp(argument);