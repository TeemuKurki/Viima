$(document).ready(function(){

    $("#btn").click(function () {
        var text = $("#text").val();
        $.post("https://hooks.slack.com/services/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", {text: "testi2"}, function(data,status){
            alert("Data: "+data);
        })
    });
     

});