function getUser(app, request, authorizationToken, callback){
    var headers = {
        'Authorization': 'Bearer '+authorizationToken
    };
    var options = {
        url: "https://app.viima.com/api/user/",
        method: "GET",
        headers: headers,
    }
       request(options, function(viimaErr, viimaRes, viimaBody){
            var jsonResponseUser = JSON.parse(viimaBody);
            callback(jsonResponseUser);
        });
             
}
module.exports.getUser = getUser;
