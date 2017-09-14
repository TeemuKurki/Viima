function sendMessageToSlack(webhookUrl, request, message, title){
    var jsonBody = JSON.stringify({
        "text": message,
        "attachments": [{
                "title": title
            }]
        })
    request.post({
        uri: webhookUrl,
        body: jsonBody,
        function (err,res,body) {       
        }
    });
}
module.exports.sendMessageToSlack = sendMessageToSlack;