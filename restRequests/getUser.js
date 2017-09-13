function getUser(app, request, authorizationToken){
        request.get({
            uri: "https://app.viima.com/api/user/",
            headers:
                {
                    'Authorization': 'Bearer '+authorizationToken
                }
            
        }, function(viimaErr, viimaRes, viimaBody){
            //var jsonResponseUser = JSON.parse(viimaBody);
            console.log(viimaErr);
            console.log(viimaBody);
        });     
}
module.exports.getUser = getUser;


/*



curl -X POST https://app.viima.com/oauth2/token/ -d 
"client_id=fvxEzinErhhYHFZmexEX83HH62L7ODDCq4z8xtt9&
client_secret=Ss5HhvW81AL6utHEdk7GhicVdbZxJ4fNCEaSEOHtAtcTnsTUUhQa3ZT1N8JnH36M5A1STRZ0eD3CVACAYQLcgbwmQ4g4lXHWmPbqO9U00pHdqcEX2QL1t61Mjwq6yeLm
&grant_type=password&username=<EMAIL>&password=<PASSWORD>&scope=read"
*/