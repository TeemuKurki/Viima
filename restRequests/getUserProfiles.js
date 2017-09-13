function getUserProfiles(app, request){
    request.get("https://app.viima.com/api/customers/1808/user_profiles/", function(viimaErr, viimaRes, viimaBody){
        var jsonResponseProfiles = JSON.parse(viimaBody);
    });
}
module.exports.getUserProfiles = getUserProfiles;