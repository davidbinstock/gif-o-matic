//create topics array to hold tipics as strings
var apiKey = "DsE3jUs66loKr5a8pIDriMWDsrdrlIeB";
var topicsArray = ["larry david", "dave chappelle", "john mulaney"];
renderButtons();

//create function that iterates over topicsArray and creates a button for each element
function renderButtons(){
    $("#button-holder").empty();
    for (var i=0; i< topicsArray.length; i++){
        var newTopicDiv = $("<span>");
        var newButton = $("<button>").text(topicsArray[i]).addClass("topic-button").attr("data-topic", topicsArray[i]);
        
        //add button to delete topic
        var deleteButton = $("<button>").text("X").addClass("delete-button").attr("data-index", i);
        //add index attribute for deleting purposes
        newTopicDiv.append(deleteButton,newButton);
        
        
        $("#button-holder").append(newTopicDiv);
    }
}

//when user clicks button, call giphy api to grab gifs of that topic
$(document).on("click", ".topic-button", function(){
    console.log("you clicked on " + $(this).attr("data-topic"))
    var currentTopic = $(this).attr("data-topic");
    //make query string
    var queryString = "https://api.giphy.com/v1/gifs/search?limit=10&api_key="+apiKey+"&q=" + currentTopic ;

    // make ajax call
    $.ajax({
        url: queryString,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var results = response.data
        for (var i = 0; i<results.length;i++){
            var gifDiv = $("<div>").addClass("gif-div");
            var p = $("<p>").text("Rating: "+results[i].rating);
            var image = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            //adding still, animate, and state attributes and "gif" class for pausing
            image.attr("data-state", "still")
            image.attr("data-still",results[i].images.fixed_height_still.url)
            image.attr("data-animate",results[i].images.fixed_height.url)
            image.addClass("gif")
            
            gifDiv.append(p,image)
            $("#gif-holder").prepend(gifDiv)

        }
    })
})

//when user clicks on image it chould toggle between animated and still images
$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src",$(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("changed state from still to animate")
      }else{
        $(this).attr("src",$(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log("changed state from animate to still")
      } 

})

//when user enters text and hits submit, add button to the list
$("#submit-button").on("click", function(){
    event.preventDefault();
    // put contents of text box into a variable
    var text = $("#input-text").val();
    //if nothing is in the textbox, do nothing
    if(!text){
        console.log("type something in the box")
        return;
    }
    //if topic is already in the array do not add it
    if(topicsArray.indexOf(text)>= 0){
        console.log("you already have that topic, choose another");
        return;
    }
    topicsArray.unshift(text);  
    renderButtons();
    //empty text input box
    $("#input-text").val("");

})

//when the delete button is clicked, remove that item from the topics array and re-render buttons
$(document).on("click", ".delete-button", function(){
    var elementIndex = $(this).attr("data-index");
    console.log(elementIndex)

    topicsArray.splice(elementIndex,1);
    renderButtons();
})