// oBGyUoI5TyZCn3aVahlZDTOWhiEnBvPk
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fetch = require('node-fetch');

const app = express();

app.get( "/", function( request, response ){
    let url = 'your api url ';

    let options = {method: 'GET', qs: {apikey: 'yourAPIKey'}};

    https.get( url, function( response ){
        console.log( response.statusCode);

        response.on( "data", function( data ){
            const wetharData = JSON.parse( data );
            const temp = wetharData.main.temp
        });
    });

});

app.listen( 9876 );