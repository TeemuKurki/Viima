var express = require('express');
var app = express();
var request = require('request');

var getUser = require("./restRequests/getUser.js");
var getActivities = require("./restRequests/getActivities.js");


if(process.argv[2] === "" || process.argv[2] === undefined){
    console.log("Insert Access token as a first parameter");
    return;
}

if(process.argv[3] === "" || process.argv[3] === undefined){
    console.log("Insert Access token as a second parameter");
    return;
}
//Get Access token from first parameter
var token = process.argv[2];
//Get Webhook Url from second parameter
var webhookUrl = process.argv[3];

getUser.getUser(app, request, token, function(body){
    var board = body.customer_ids_where_admin[0];
    if(board != ""){
        //Run getActivities every 5 second
        var setRequestLoop = setInterval(function(){
            getActivities.getActivities(app,request, board, webhookUrl);
        }, 5000);
    }
});



var port = 3000;
var server = app.listen(port);
console.log('Listening on port ' + port);
