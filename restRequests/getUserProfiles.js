function getUserProfiles(app, request, board){
    request.get("https://app.viima.com/api/customers/"+board+"/user_profiles/", function(viimaErr, viimaRes, viimaBody){
        var jsonResponseProfiles = JSON.parse(viimaBody);
    });
}
module.exports.getUserProfiles = getUserProfiles;