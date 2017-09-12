$(document).ready(function(){


    var gameArray = [];
    var gameArray2 = [];
    var sortedGamesArray = [];

    function firstGames(steamId) {
        return ($.get("http://213.243.178.218/steam/"+steamId, function (data, status) { 
            gameArray = data.response.games;
         }));
    }

    function secondGames(steamId) {
        return ($.get("http://213.243.178.218/steam/"+steamId, function (data, status) { 
            gameArray2 = data.response.games;
         }));
    }

    function emptyTable() {
        $("#gameInfo > tbody").remove();
        $("#gameInfo").append("<tbody></tbody>");
     }

    $("#getGames").click(function () {
        emptyTable();
        var firstSteamId = $("#steamId1").val();
        var secondSteamId = $("#steamId2").val();

        $.when(firstGames(firstSteamId), secondGames(secondSteamId)).done(function () {
            var combinedGames = [];
            gameArray.forEach(function (game1) {
                gameArray2.forEach(function (game2) { 
                    if(game1.appid === game2.appid){
                        combinedGames.push(game1);
                    }
                 }, this);
            }, this);

            for (var i = 0; i < combinedGames.length; i++) {
                var img = "<img src='http://cdn.edgecast.steamstatic.com/steamcommunity/public/images/apps/"+combinedGames[i].appid+"/"+ combinedGames[i].img_logo_url +".jpg' />";
                $("#gameInfo > tbody:last-child").append("<tr><td>"+combinedGames[i].name+"</td><td>"+img+"</td></tr>");    
            }
            $("#loadingTemp").remove();
         })
         $("#gameInfo > tbody:last-child").append("<img id='loadingTemp' src='img/loading.gif' />");  
     })

     

});