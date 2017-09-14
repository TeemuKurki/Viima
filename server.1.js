var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

var getUser = require("./restRequests/getUser.js");
var getActivities = require("./restRequests/getActivities.js");

app.use(bodyParser.text());

if(process.argv[2] === "" || process.argv[2] === undefined){
    console.log("Insert Access token as a first parameter");
    return;
}

if(process.argv[3] === "" || process.argv[3] === undefined){
    console.log("Insert Access token as a second parameter");
    return;
}

var token = process.argv[2];
var webhookUrl = process.argv[3];

getUser.getUser(app, request, token, function(body){
    var board = body.customer_ids_where_admin[0];
    if(board != ""){
        var setRequestLoop = setInterval(function(){
            getActivities.getActivities(app,request, board, webhookUrl);
        }, 5000);
    }
});



var port = 3000;
var server = app.listen(port);
console.log('Listening on port ' + port);
