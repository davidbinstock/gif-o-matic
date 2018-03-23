//create topicsarray object to hold 
var apiKey = "DsE3jUs66loKr5a8pIDriMWDsrdrlIeB";
var topicsArray = ["larry david", "dave chappelle", "john mulaney"];
renderButtons();

//create function that iterates over topicsArray and creates a button for each element
function renderButtons(){
    $("#button-holder").empty();
    for (var i=0; i< topicsArray.length; i++){
        var newButton = $("<button>").text(topicsArray[i]).addClass("topic-button").attr("data-topic", topicsArray[i]);
        $("#button-holder").append(newButton);
    }
}

//when user clicks button, call giphy api to grap gifs of that topic
$(document).on("click", ".topic-button", function(){
    console.log("you clicked on " + $(this).attr("data-topic"))
    var currentTopic = $(this).attr("data-topic");
    //make query string
    var queryString = "https://api.giphy.com/v1/gifs/random?api_key="+apiKey+"&tag=" + currentTopic ;

    // make ajax call
    $.ajax({
        url: queryString,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var imageUrl = response.data.image_original_url;
        var newImage = $("<img>").attr("src", imageUrl).attr("alt", currentTopic );
        $("#gif-holder").prepend(newImage)

    })
})
