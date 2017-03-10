//possible phase: pull in data for button / adding button & adding data to the button 

// ============== array =========================

//create an array of animals for user to click later
var listOfAnimalName = ["dog", "Toad", "Trout", "Turkey",
  "Turtle",
  "Viper",
  "Vulture",
  "Wallaby",
  "Walrus",
  "Wasp",
  "Weasel",
  "Whale",
  "Wildcat",
  "Wolf", "bird", "fish", "cat"
];

// =============================================
function displayAnimalInfo() {

  var pet = $(this).attr("data-animal");
  //Giphy search endpoint / load still fist --- remember to change the limit to 10
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pet + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);

  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .done(function(response) {
    //getting all the object / debugger;
    var results = response.data;
    console.log(response);
    console.log(results);

    for (var i = 0; i < results.length; i++) {
      //only taking appropriate rating
      // if(result[i].rating !== "r" results[i].rating !== "pg-13")
      //creating a div with the class "item"
      var gifDiv = $("<div class='item'>");

      //storing the item 
      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var animalImage = $("<img>");
      animalImage.addClass("gif");
      // =============================================

      animalImage.attr({
        "src": results[i].images.fixed_height_still.url,
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url,
        "data-state": "still"
      });

      gifDiv.append(p);
      gifDiv.append(animalImage);

      $("#gifs-appear-here").prepend(gifDiv);
    }
  });
  // src", results[i].images.fixed_height_still.url
  // =============================================

}
// ============== CODE CREATING A BUTTON FOR EACH ANIMAL IN THE ARRAY =========================
// link #animalbuttons -- by creating a dynamic button
function renderButton() {
  $('#animalButtons').empty();
  //loops the array of animals
  for (var i = 0; i < listOfAnimalName.length; i++) {
    var createNewButtonArray = $("<button>");
    //adds a class to button
    createNewButtonArray.addClass("pet");
    //adds a data-attribute
    createNewButtonArray.attr("data-animal", listOfAnimalName[i]);
    //button text
    createNewButtonArray.text(listOfAnimalName[i]);
    //added the button to the animalbuttons id div
    $('#animalButtons').append(createNewButtonArray);
  }
}

// ============== CODE FOR THE USER ANIMAL INPUT INTO THE ARRAY WITH THE LIST=========================
$('#addAnimal').on("click", function(event) {
  event.preventDefault();
  //grab the input from the textbox
  var pet = $('#animal-input').val().trim();
  //stop creating empty button
  if (!(pet == '')) {
    } else {
  alert("Please Fill In The Animal You Want To See.");
  pet.stop()
  }
  // animal from the textbox added to the array
  listOfAnimalName.push(pet);
  //calling renderButtons to handlles the array of animals
  renderButton();
});

// ==============INTIALIZE=========================
$(document).on('click', '.pet', displayAnimalInfo);
// Calling the renderButtons function to display the intial buttons
renderButton();

$(document).on('click', '.gif', function() {
  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  };
});

