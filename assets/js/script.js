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
                    if(data.data[Object.keys(data.data)[i]][2]) {
                        //console log second flight option in the airport
                        console.log(data.data[Object.keys(data.data)[i]][2]);
                    } else if (data.data[Object.keys(data.data)[i]][1]) {
                        //console log available cheap flights airport arrays
                        console.log(data.data[Object.keys(data.data)[i]][1]);
                    } else if (data.data[Object.keys(data.data)[i]][0]) {
                        //console log available cheap flights airport arrays
                        console.log(data.data[Object.keys(data.data)[i]][0]);
                    } else if (!data.data[Object.keys(data.data)[i]][0] || !data.data[Object.keys(data.data)[i]][1]) {
                        //restart loop
                        return;
                    }

                }

            });
        };
    });
};

var getFlightInput = function(event) {
    //prevent page refresh
    event.preventDefault();
    //if iata city code exists
    if (originCity && originCity.value) {
        //establish value as origin variable
        var origin = originCity.value;
        //pass iata origin to getFlightPrices function
        getFlightPrices(origin);
    } else {
        alert('Please Enter a City Name');
    }

}

originSearch.addEventListener("click", getFlightInput);