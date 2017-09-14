var send = require("./sendMessageToSlack.js");
//Set localActivityCount to -1 so only first time when server starts,
//in the beginning of function, it will be set equal to jsonResponseActivities.count
var localActivityCount = -1;
function getActivities(app, request, board, webhookUrl){
        request.get("https://app.viima.com/api/customers/"+board+"/activities/", function(viimaErr,viimaRes, viimaBody){
            var jsonResponseActivities = JSON.parse(viimaBody);
            if(localActivityCount === -1){
                localActivityCount = jsonResponseActivities.count;
            }
            //If new activity has recieved send it to Slack
            if(localActivityCount < jsonResponseActivities.count){
                var j = 0;
                for (var i = localActivityCount; i < jsonResponseActivities.count; i++) {
                    var result = jsonResponseActivities.results[j];
                    switch(result.model){
                        case "comment":
                            send.sendMessageToSlack(webhookUrl, request, result.fullname + " added a new comment to "+ result.name, result.content);
                            break;
                        case "item":
                            send.sendMessageToSlack(webhookUrl, request, result.fullname + " created an new idea: "+ result.name,result.content);
                            break;
                        default:
                            console.log("Default triggered! \nModel: "+result.model);
                            break;
                    }
                    j++;
                    
                }
            }
            localActivityCount = jsonResponseActivities.count;
        });
}
module.exports.getActivities = getActivities;