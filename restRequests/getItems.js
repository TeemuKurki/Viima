
function getItems(app, request){
    request.get("https://app.viima.com/api/customers/1808/items/", function(viimaErr,viimaRes, viimaBody){
        var jsonResponseItems = JSON.parse(viimaBody);
    });
}
module.exports.getItems = getItems;