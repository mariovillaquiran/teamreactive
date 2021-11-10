var returnDate;
var departDate;
var originSearch = document.getElementById('searchBtn');
var originCity = document.getElementById('city');
var flightOptions = document.getElementById('flight-options');
var expiryDate;
var departDateTime;
var returnDateTime;


var createElements = function (flightData, flightAirport) {
    //create card container
    var flightOptionCard = document.createElement('div');
    //add card container class
    flightOptionCard.classList.add('card', 'col-md', 'col-sm-12');
    //create card body
    var flightOptionCardBody = document.createElement('div');
    //add card body class
    flightOptionCardBody.classList.add('card-body');
    //create title
    var flightOptionCardTitle = document.createElement('h5')
    //add title class
    flightOptionCardTitle.classList.add('card-title');
    //set title = city name
    flightOptionCardTitle.textContent = 'Flight to: '+ flightAirport;
    //create text card
    var flightOptionCardText = document.createElement('div');
    //add card text class
    flightOptionCardText.classList.add('card-text');
    //create ordered list for data
    var flightOptionCardOL = document.createElement('ul');
    //create temp li
    var flightOptionCardDepart = document.createElement('li');
    //assign departure li text
    departDateTime = new Date(flightData.departure_at);
    departDateTime.toString();
    flightOptionCardDepart.textContent = 'Departure = ' + departDateTime;
    //create return element
    var flightOptionReturn = document.createElement('li');
    //add content to return
    returnDateTime = new Date(flightData.return_at);
    returnDateTime.toString();
    flightOptionReturn.textContent = 'Departure = ' + returnDateTime;
    //create list item for price
    var flightOptionPrice = document.createElement('li');
    flightOptionPrice.textContent = 'Price (USD) = $'+flightData.price;
    //create list item for expires
    var flightOptionExpires = document.createElement('li');
    expiryDate = new Date(flightData.expires_at);
    expiryDate.toString();
    flightOptionExpires.textContent = 'Expires on = '+ expiryDate;                        
            //add card body to card
            flightOptionCard.append(flightOptionCardBody);
            //add card title to card body
            flightOptionCardBody.append(flightOptionCardTitle);
            //add card text to body
            flightOptionCardBody.append(flightOptionCardText);
            //add ol to text container
            flightOptionCardText.append(flightOptionCardOL);
            //add list items to ol
            flightOptionCardOL.append(flightOptionCardDepart);
            flightOptionCardOL.append(flightOptionReturn);
            flightOptionCardOL.append(flightOptionPrice);
            flightOptionCardOL.append(flightOptionExpires);
            //append daily card to daily card container
            flightOptions.append(flightOptionCard);
}


var getFlightPrices = function(origin) {
    //need to clear input
    flightOptions.innerHTML = '';

    

    //get variable for flighttracker api
    var flightAPI = 'https://cors-anywhere.herokuapp.com/https://api.travelpayouts.com/v1/prices/cheap?currency=usd&origin='+origin+'&token=d6d40c4eb3a903fde45b4f150345dc6d';

    fetch(flightAPI).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {

    //if no results for this airport, show no results card
    if (!data.data[Object.keys(data.data)[0]]) {
        //create card container
        var flightOptionCard = document.createElement('div');
        //add card container class
        flightOptionCard.classList.add('card', 'col-md', 'col-sm-12');
        //create card body
        var flightOptionCardBody = document.createElement('div');
        //add card body class
        flightOptionCardBody.classList.add('card-body');
        //create title
        var flightOptionCardTitle = document.createElement('h5')
        //add title class
        flightOptionCardTitle.classList.add('card-title');
        //set title = city name
        flightOptionCardTitle.textContent = 'Oops! There have not been any results for this Airport recently.  Please try another one.';
        //add card body to card
        flightOptionCard.append(flightOptionCardBody);
        //add card title to card body
        flightOptionCardBody.append(flightOptionCardTitle);
        //append daily card to daily card container
        flightOptions.append(flightOptionCard);
    } else {

                //console log return response
                console.log(data);
                //console log all aiport objects
                console.log(data[Object.keys(data)[1]]);
                console.log(data.data);
                //console log first airport array
                console.log(data.data[Object.keys(data.data)[0]]);
                console.log(Object.keys(data.data)[0]);
                //console log first value from first airport array
                console.log(data.data[Object.keys(data.data)[0]][0]);
                var enumerableLength = Object.keys(data.data);
                console.log(enumerableLength.length);
                for (var i=0; i<enumerableLength.length; i++) {
                    if(data.data[Object.keys(data.data)[i]][2]) {
                        //create flight cards for 3rd flight option in airport
                        createElements(data.data[Object.keys(data.data)[i]][2], Object.keys(data.data)[i]);
                        
                        
                    } else if (data.data[Object.keys(data.data)[i]][1]) {

                        //create flight cards fo 2nd flight option in an airport
                        createElements(data.data[Object.keys(data.data)[i]][1], Object.keys(data.data)[i]);

                    } else if (data.data[Object.keys(data.data)[i]][0]) {
                        //create flight cards for 1st flight option in an airport
                        createElements(data.data[Object.keys(data.data)[i]][0], Object.keys(data.data)[i]);
                        
                    } else if (!data.data[Object.keys(data.data)[i]][0] || !data.data[Object.keys(data.data)[i]][1]) {
                        //restart loop
                        return;
                    }

                }

            }});
        } else {
            alert('Please Click Request Demo Button below and then the accompanying button on the next page');
        }
    })
  
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