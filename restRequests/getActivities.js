var send = require("./sendMessageToSlack.js");
var countUpdate = -1;
function getActivities(app, request){
        request.get("https://app.viima.com/api/customers/1808/activities/", function(viimaErr,viimaRes, viimaBody){
            var jsonResponseActivities = JSON.parse(viimaBody);
            console.log("CountUpdate: "+countUpdate)
            console.log(jsonResponseActivities.count);
            if(countUpdate === -1){
                countUpdate = jsonResponseActivities.count;
                console.log("countUpdate Setted to jsonResponseActivities.count");
            }
            console.log("CountUpdate2: "+countUpdate)
            if(countUpdate < jsonResponseActivities.count){
                console.log("ERO");
                var j = 0;
                for (var i = countUpdate; i < jsonResponseActivities.count; i++) {
                    var result = jsonResponseActivities.results[j];
                    switch(jsonResponseActivities.results[j].model){
                        case "comment":
                            console.log("Kommntti");
                            send.sendMessageToSlack(request, result.fullname + " added new comment to "+ result.name, result.content);
                            break;
                        case "item":
                            send.sendMessageToSlack(request, result.fullname + " created new item "+ result.name,result.content);
                            break;
                    }
                    j++;
                    
                }
                countUpdate = jsonResponseActivities.count;
            }
        });
}
module.exports.getActivities = getActivities;