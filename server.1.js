var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

var getUser = require("./restRequests/getUser.js");
var getActivities = require("./restRequests/getActivities.js");

app.use(bodyParser.text());

if(process.argv[2] === "" || process.argv[2] === undefined){
    console.log("Insert Access token as a parameter");
    return;
}

var token = process.argv[2];

getUser.getUser(app, request, token, function(body){
    var board = body.customer_ids_where_admin[0];
    if(board != ""){
        var setRequestLoop = setInterval(function(){
            getActivities.getActivities(app,request, board);
        }, 5000);
    }
});



var port = 3000;
var server = app.listen(port);
console.log('Listening on port ' + port);
