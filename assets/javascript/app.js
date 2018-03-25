//create topics array to hold tipics as strings
var apiKey = "DsE3jUs66loKr5a8pIDriMWDsrdrlIeB";
var topicsArray = ["kermit", "gonzo", "beaker", "fozzy bear"];
renderButtons();

$("#pop-up-box").hide();
var messageLockout = false;


//create function that iterates over topicsArray and creates a button for each element
function renderButtons(){
    $("#button-holder").empty();
    for (var i=0; i< topicsArray.length; i++){
        var newTopicSpan = $("<span>").addClass("topic-span");
        var newButton = $("<button>").text(topicsArray[i]).addClass("topic-button").attr("data-topic", topicsArray[i]);
        
        //add button to delete topic
        var deleteButton = $("<button>").text("x").addClass("delete-button").attr("data-index", i);
        //add index attribute for deleting purposes
        newTopicSpan.append(deleteButton,newButton);
        
        
        $("#button-holder").append(newTopicSpan);
    }
}

//when user clicks button, call giphy api to grab gifs of that topic
$(document).on("click", ".topic-button", function(){
    if(messageLockout){
        console.log("close message box to continue")
        return;
    }
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
        //check if search cam back empty
        if(results.length ==0 ){
            console.log("GIPHY didn't find any results");
            popUpMessage("GIPHY didn't find any results for that topic");
            return;
        }

        for (var i = 0; i<results.length;i++){
            var gifDiv = $("<div>").addClass("gif-div");
            var rating = $("<p>").text("Rating: "+results[i].rating).addClass("rating");
            var image = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            //adding still, animate, and state attributes and "gif" class for pausing
            image.attr("data-state", "still")
            image.attr("data-still",results[i].images.fixed_height_still.url)
            image.attr("data-animate",results[i].images.fixed_height.url)
            image.addClass("gif")
            
            gifDiv.append(rating,image)
            $("#gif-holder").prepend(gifDiv)

        }
    }, function(error){
        console.log("there was an error")
        console.log(error)
    })
})

//when user clicks on image it chould toggle between animated and still images
$(document).on("click", ".gif", function(){
    if(messageLockout){
        console.log("close message box to continue")
        return;
    }
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

    if(messageLockout){
        console.log("close message box to continue")
        return;
    }
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
        popUpMessage("You already have that topic, choose another");
        $("#input-text").val("");
        return;
    }
    topicsArray.unshift(text);  
    renderButtons();
    //empty text input box
    $("#input-text").val("");

})

//when the delete button is clicked, remove that item from the topics array and re-render buttons
$(document).on("click", ".delete-button", function(){
    if(messageLockout){
        console.log("close message box to continue")
        return;
    }

    var elementIndex = $(this).attr("data-index");
    console.log(elementIndex)

    topicsArray.splice(elementIndex,1);
    renderButtons();
})
//create a pop-up message
function popUpMessage(message){
    $("#pop-up-message").html(message);
    $("#pop-up-box").show();
    messageLockout = true;
}

//when pop-up message ok button is clicke, hide the message box
$("#pop-up-ok-button").on("click", function(){
    $("#pop-up-box").hide();
    messageLockout = false;
})