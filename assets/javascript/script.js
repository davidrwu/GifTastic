// Initial array of Disney properties
var disney = ["Lilo and Stitch", "Aladdin", "Beauty and the Beast", "The Lion King"];

// Functions to call 
function displayDisneyInfo() {

  var disney = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ disney +"&api_key=dc6zaTOxFJmzC&limit=10";

  // Creating an AJAX call for the button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    $("#disney-view").empty();
    var results = response.data;

    // Looping through each result item
    for (var i = 0; i < results.length; i++) {

      // Creating and storing a div tag
      var createDiv = $("<div class='border'>");

      // Creating a paragraph tag with the result item's rating
      var p = $("<div class='center'>").text("Rating: " + results[i].rating.toUpperCase());

      // Creating and storing an image tag
      var disneyImg = $("<img class='gifStyle gif'>");
      // Setting the src attribute of the image to a property pulled off the result item
      disneyImg.attr({
        src: results[i].images.original.url,
        "data-state": "still",
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url
       });

      // Appending the paragraph and image tag to the animalDiv
      createDiv.append(disneyImg);
      createDiv.append(p);

       $("#disney-view").append(createDiv);
    }
  });
}

function renderButtons() {

  // Deleting the buttons prior to add a new button
  $("#buttons-view").empty();

  // Looping through the array
  for (var i = 0; i < disney.length; i++) {

    // Then dynamicaly generating buttons for each item in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class to our button
    a.addClass("disney");
    // Adding a data-attribute
    a.attr("data-name", disney[i]);
    // Providing the initial button text
    a.text(disney[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

//Event listeners to activate click
$(document).on("click",".gif", function() {
// The attr jQuery method allows us to get the value of any attribute on our HTML element
var state = $(this).attr("data-state");

// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
  $(this).attr("src", $(this).attr("data-animate"));
  $(this).attr("data-state", "animate");
} else {
  $(this).attr("src", $(this).attr("data-still"));
  $(this).attr("data-state", "still");
}
});

// This function handles events where a button is clicked
$("#add-disney").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var newDisney = $("#disney-input").val().trim();

  // Adding an item from the textbox to our array
  disney.push(newDisney);

  // Calling renderButtons which handles the processing of our disney array
  renderButtons();
});

// Adding a click event listener to all elements with a class of "disney"
$(document).on("click", ".disney", displayDisneyInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
