//Back end logic Location Book
function LocationBook() {
  this.locations = [],
  this.currentId = 0
}

LocationBook.prototype.addLocation = function(location) {
  location.id = this.assignId();
  this.locations.push(location);
}

LocationBook.prototype.assignId = function() {
  this.currentId +=1;
  return this.currentId;
}

LocationBook.prototype.findLocation = function(id) {
  for ( var i=0; i< this.locations.length; i++) {
    if(this.locations[i]) {
      if (this.locations[i].id ==id) {
        return this.locations[i];
      }
    }
  };
  return false;
}
LocationBook.prototype.deleteLocation = function(id){
  for (var i=0; i<this.locations.length; i++) {
    if (this.locations[i]) {
      if (this.locations[i].id ==id) {
        delete this.locations[i];
        return true;
      }
    }
  };
  return false;
}
//Back end logic for Locations
function Place (location, landmark, time, notes) {
  this.location = location,
  this.landmark = landmark,
  this.time = time,
  this.notes = notes
}


//front end logic
var locationBook = new LocationBook();

function displayLocationDetails(locationBookToDisplay) {
  var locationList = $("ul#locations");
  var htmlForLocationInfo = "";
  locationBookToDisplay.locations.forEach(function(location) {
      htmlForLocationInfo += "<li id=" + location.id + ">" + location.location + "</li>";
  });
  locationList.html(htmlForLocationInfo);
};

function showLocation(locationId){
  var location =locationBook.findLocation(locationId);
  $("#show-location").show();
  $(".name-location").html(location.location);
  $(".famous-landmark").html(location.landmark);
  $(".time").html(location.time);
  $(".notes").html(location.notes);
  var buttons=$("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + location.id + ">Delete</button>");
};

function attachLocationListeners() {
  $("ul#locations").on("click", "li", function() {
    showLocation(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    locationBook.deleteLocation(this.id);
    $("#show-location").hide();
    displayLocationDetails(locationBook);
  });
};

$(document).ready(function() {
  attachLocationListeners();
  $("form#new-place").submit(function(event) {
    event.preventDefault();
    var inputtedNewLocation = $("input#new-location").val();
    var inputtedNewLandmark = $("input#new-landmark").val();
    var inputtedNewTime = $("input#new-time").val();
    var inputtedNewNotes = $("input#new-notes").val();
    $("input#new-location").val("");
    $("input#new-landmark").val("");
    $("input#new-time").val("");
    $("input#new-notes").val("");
    var newLocation = new Place(inputtedNewLocation, inputtedNewLandmark, inputtedNewTime,  inputtedNewNotes);
    locationBook.addLocation(newLocation);
    displayLocationDetails(locationBook);
  });
});
