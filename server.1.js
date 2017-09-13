var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

require("./arrayCompare.js");
var getAuthorization = require("./restRequests/getAuthorization.js");
var getUser = require("./restRequests/getUser.js");
var getActivities = require("./restRequests/getActivities.js");
var getItems = require("./restRequests/getItems.js");
var getUserProfiles = require("./restRequests/getUserProfiles.js");

app.use(bodyParser.text());

getAuthorization.getAuthorization(app, request);
//var user = getUser.getUser(app, request);

//var setRequestLoop = setInterval(function(){
//    getActivities.getActivities(app,request);
//}, 5000);

getItems.getItems(app,request);

getUserProfiles.getUserProfiles(app,request);



var port = 3000;
var server = app.listen(port);
console.log('Listening on port ' + port);
