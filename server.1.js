var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
require("./arrayCompare.js");

app.use(bodyParser.text());

var fs = require('fs');

function writeTempJson(name, data){
    fs.writeFile("temp/"+name+".json",data, function(err){
        if(err){
            console.log(err);
        }
    });
}

function readTempJson(name){
    return JSON.parse(fs.readFileSync("temp/"+name+".json", "utf8"));
};



app.get("/getItems",function(req,res){
    request.get("https://app.viima.com/api/customers/1808/items/", function(viimaErr,viimaRes, viimaBody){
        var jsonResponseItems = JSON.parse(viimaBody);
        var itemIdsFromApi = [];
        res.setHeader('Content-Type', 'application/json');

        for(var i = 0; i < jsonResponseItems.length; i++){
            itemIdsFromApi.push(jsonResponseItems[i]);
        }
        if(fs.existsSync("temp/itemIds.json")){
            var jsonTemp = readTempJson("itemIds");
            console.log(itemIdsFromApi.equals(jsonTemp));

        }
        else{
            console.log("Creating new file");
            writeTempJson("itemIds",JSON.stringify(itemIdsFromApi));
        }
        res.send(jsonResponseItems);
    });
});


var countUpdate = -1;

app.get("/getActivities",function(req,res){
    request.get("https://app.viima.com/api/customers/1808/activities/", function(viimaErr,viimaRes, viimaBody){
        var jsonResponseActivities = JSON.parse(viimaBody);
        if(countUpdate === -1){
            countUpdate = jsonResponseActivities.count;
            console.log("countUpdate Setted to jsonResponseActivities.count");
        }
        if(countUpdate < jsonResponseActivities.count){
            var j = 0;
            for (var i = countUpdate; i < jsonResponseActivities.count; i++) {
                switch(jsonResponseActivities.results[j].model){
                    case "comment":
                        sendMessageToSlack("Kommentti: "+jsonResponseActivities.results[j].content);
                        break;
                    case "item":
                        sendMessageToSlack("Itemi: "+jsonResponseActivities.results[j].name);
                        break;
                }
                j++;
                
            }
            countUpdate = jsonResponseActivities.count;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonResponseActivities);
    });
});

app.get("/getUser_profiles", function(req,res){
    request.get("https://app.viima.com/api/customers/1808/user_profiles/", function(viimaErr, viimaRes, viimaBody){
        var jsonResponseProfiles = JSON.parse(viimaBody);
        res.setHeader('Content-Type', 'application/json');
        res.send(jsonResponseProfiles);
    });
});

var textFromScript = "tekstiä scriptistä";

function sendMessageToSlack(message){
    var jsonBody = JSON.stringify({"text": message})
    request.post({
        uri: "https://hooks.slack.com/services/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",
        body: jsonBody,
        //body: "{'text': '"+message+"'}",
        function (err,res,body) {       
        }
    });
}

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
