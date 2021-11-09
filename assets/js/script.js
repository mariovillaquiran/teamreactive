var returnDate;
var departDate;
var originSearch = document.getElementById('searchBtn');
var originCity = document.getElementById('city');


var getFlightPrices = function(origin) {
    //need to clear input

    //get variable for flighttracker api
    var flightAPI = 'https://cors-anywhere.herokuapp.com/https://api.travelpayouts.com/v1/prices/cheap?origin='+origin+'&token=d6d40c4eb3a903fde45b4f150345dc6d';

    fetch(flightAPI).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
            })
        }
    })
}

var getFlightInput = function(event) {
    //prevent page refresh
    event.preventDefault();

    if (originCity && originCity.value) {
        var origin = originCity.value;
        getFlightPrices(origin);
    } else {
        alert('Please Enter a City Name');
    }

}

originSearch.addEventListener("click", getFlightInput);