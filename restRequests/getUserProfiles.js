function getUserProfiles(app, request){
    app.get("/getUser_profiles", function(req,res){
        request.get("https://app.viima.com/api/customers/1808/user_profiles/", function(viimaErr, viimaRes, viimaBody){
            var jsonResponseProfiles = JSON.parse(viimaBody);
            res.setHeader('Content-Type', 'application/json');
            res.send(jsonResponseProfiles);
        });
    });
}
module.exports.getUserProfiles = getUserProfiles;