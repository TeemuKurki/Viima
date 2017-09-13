var fs = require('fs');

function writeTempJson(name, data){
    fs.writeFile("temp/"+name+".json",data, function(err){
        if(err){
            console.log(err);
        }
    });
}

function readTempJson(name){
    return JSON.parse(fs.readFileSync("temp/"+name+".json", "utf8"));
};
function getItems(app, request){
    app.get("/getItems",function(req,res){
        request.get("https://app.viima.com/api/customers/1808/items/", function(viimaErr,viimaRes, viimaBody){
            var jsonResponseItems = JSON.parse(viimaBody);
            var itemIdsFromApi = [];
            res.setHeader('Content-Type', 'application/json');
    
            for(var i = 0; i < jsonResponseItems.length; i++){
                itemIdsFromApi.push(jsonResponseItems[i]);
            }
            if(fs.existsSync("temp/itemIds.json")){
                var jsonTemp = readTempJson("itemIds");
                console.log(itemIdsFromApi.equals(jsonTemp));
    
            }
            else{
                console.log("Creating new file");
                writeTempJson("itemIds",JSON.stringify(itemIdsFromApi));
            }
            res.send(jsonResponseItems);
        });
    });
}
module.exports.getItems = getItems;