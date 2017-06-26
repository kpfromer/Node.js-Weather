"use strict";
const https = require('https');
const api = require('./api.json')

function printError({message = "An error was encountered: ", error}) {
    console.error(`${message} ${error}`);
}

function getTemp(zip){

    try {

        const request = https.get(`https://api.wunderground.com/api/${api.key}/conditions/q/${zip}.json`, response => {

            let body = "";
            
            response.on("data", data => {
                body += data.toString();
            });
            
            response.on("end", () => {
                try {
                    
                    const weather = JSON.parse(body);
                    
                    console.log(`Temperature in ${weather.current_observation.display_location.full} is ${weather.current_observation.temperature_string}`);
                    
                } catch (error){
                    printError({error: error});
                }
            });

        });

        request.on("error", error => {
            printError({message: "Invalid url: ", error: error})
        });

    } catch (error){
        printError({error: error})
    }
}

module.exports.getTemp = getTemp;