const express = require('express');
const https = require("https");

const app = express();

app.get( "/", function( request, response) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=e40b74aaf5e7a348f0289eb27454adc2&units=metric";

  https.get( url, function(res) {
    console.log(res.statusCode);
    res.on("data", function(data) {
      const wetharData = JSON.parse(data);
      const temprature = wetharData.main.temp;
      console.log(temprature);
      const wethatDescription = wetharData.weather[0].description;
      console.log(wethatDescription);
      response.send("<h1>Temprature of Ahmedabad :::>>> " + temprature + " degree and atmosphire is " + wethatDescription + "</h1>");
    });
    console.log();
  });

});

app.listen( 9876, function() {
  console.log("App is running on port no : 9876");
});


// APIKey
// e40b74aaf5e7a348f0289eb27454adc2
// https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=e40b74aaf5e7a348f0289eb27454adc2
// https://api.openweathermap.org/data/2.5/weather?q=Ahmedabad&appid=e40b74aaf5e7a348f0289eb27454adc2
