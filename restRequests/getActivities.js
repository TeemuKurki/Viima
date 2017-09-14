var send = require("./sendMessageToSlack.js");
var countUpdate = -1;
function getActivities(app, request, board){
        request.get("https://app.viima.com/api/customers/"+board+"/activities/", function(viimaErr,viimaRes, viimaBody){
            var jsonResponseActivities = JSON.parse(viimaBody);
            if(countUpdate === -1){
                countUpdate = jsonResponseActivities.count;
            }
            if(countUpdate < jsonResponseActivities.count){
                var j = 0;
                for (var i = countUpdate; i < jsonResponseActivities.count; i++) {
                    var result = jsonResponseActivities.results[j];
                    switch(result.model){
                        case "comment":
                            send.sendMessageToSlack(request, result.fullname + " added new comment to "+ result.name, result.content);
                            break;
                        case "item":
                            send.sendMessageToSlack(request, result.fullname + " created new item "+ result.name,result.content);
                            break;
                        default:
                            console.log("Default triggered! \nModel: "+result.model);
                            break;
                    }
                    j++;
                    
                }
            }
            countUpdate = jsonResponseActivities.count;
        });
}
module.exports.getActivities = getActivities;