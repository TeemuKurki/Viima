var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

require("./arrayCompare.js");
var getActivities = require("./restRequests/getActivities.js");
var getItems = require("./restRequests/getItems.js");
var getUserProfiles = require("./restRequests/getUserProfiles.js");

app.use(bodyParser.text());


var setRequestLoop = setInterval(function(){
    getActivities.getActivities(app,request);
}, 5000);

getItems.getItems(app,request);

getUserProfiles.getUserProfiles(app,request);


/*var counter = 1;

var sendRequestLoop = setInterval(function(){
    request.post({
        uri: "https://hooks.slack.com/services/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",
        body: "{'text': '"+counter+"'}",
        function (err,res,body) {       
        }
    });
  counter++;  
}, 10000);

if(counter == 10){
    clearInterval(sendRequestLoop);
}*/


var port = 3000;
var server = app.listen(port);
console.log('Listening on port ' + port);
