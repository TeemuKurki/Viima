
function getItems(app, request, board){
    request.get("https://app.viima.com/api/customers/"+board+"/items/", function(viimaErr,viimaRes, viimaBody){
        var jsonResponseItems = JSON.parse(viimaBody);
    });
}
module.exports.getItems = getItems;