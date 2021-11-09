var returnDate;
var departDate;
var originSearch = document.getElementById('searchBtn');
var originCity = document.getElementById('city');


var getFlightPrices = function(origin) {
    //need to clear input

    //get variable for flighttracker api
    var flightAPI = 'https://cors-anywhere.herokuapp.com/https://api.travelpayouts.com/v1/prices/cheap?currency=usd&origin='+origin+'&token=d6d40c4eb3a903fde45b4f150345dc6d';

    fetch(flightAPI).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                //console log return response
                console.log(data);
                //console log all aiport objects
                console.log(data[Object.keys(data)[1]]);
                console.log(data.data);
                //console log first airport array
                console.log(data.data[Object.keys(data.data)[0]]);
                //console log first value from first airport array
                console.log(data.data[Object.keys(data.data)[0]][0]);
                var enumerableLength = Object.keys(data.data);
                console.log(enumerableLength.length);
                for (var i=0; i<enumerableLength.length; i++) {
                    //console log airport arrays
                    console.log(data.data[Object.keys(data.data)[i]][0]);
                }

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