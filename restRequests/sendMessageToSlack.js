function sendMessageToSlack(request, message, title){
    var jsonBody = JSON.stringify({
        "text": message,
        "attachments": [{
                "title": title
            }]
        })
    request.post({
        uri: "https://hooks.slack.com/services/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",
        body: jsonBody,
        //body: "{'text': '"+message+"'}",
        function (err,res,body) {       
        }
    });
}
module.exports.sendMessageToSlack = sendMessageToSlack;