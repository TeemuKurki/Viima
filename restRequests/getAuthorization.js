function getAuthorization(app, request){
    request.post({
        uri: "https://app.viima.com/oauth2/token/",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params:{
            client_id: "fvxEzinErhhYHFZmexEX83HH62L7ODDCq4z8xtt9",
            client_secret: "Ss5HhvW81AL6utHEdk7GhicVdbZxJ4fNCEaSEOHtAtcTnsTUUhQa3ZT1N8JnH36M5A1STRZ0eD3CVACAYQLcgbwmQ4g4lXHWmPbqO9U00pHdqcEX2QL1t61Mjwq6yeLm",
            grant_type: "password",
            username: "teemu.kurki@myy.haaga-helia.fi",
            password: "Shohl2gu!",
            scope: "read"
        }
        
    }, function(viimaErr, viimaRes, viimaBody){
        //var jsonResponseUser = JSON.parse(viimaBody);
        console.log(viimaRes);
        console.log(viimaBody);
    });     
}
module.exports.getAuthorization = getAuthorization;


/*



curl -X POST https://app.viima.com/oauth2/token/ -d 
"client_id=fvxEzinErhhYHFZmexEX83HH62L7ODDCq4z8xtt9&
client_secret=Ss5HhvW81AL6utHEdk7GhicVdbZxJ4fNCEaSEOHtAtcTnsTUUhQa3ZT1N8JnH36M5A1STRZ0eD3CVACAYQLcgbwmQ4g4lXHWmPbqO9U00pHdqcEX2QL1t61Mjwq6yeLm
&grant_type=password&username=<EMAIL>&password=<PASSWORD>&scope=read"
*/