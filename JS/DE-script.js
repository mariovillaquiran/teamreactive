$(document).ready(function() {
    var formEl= document.querySelector("#city-loc")
    var cityValEl = document.querySelector("#city-val")
    
    var getAp = function(event){
        event.preventDefault();
        var city = cityValEl.value

        if(city) {
            getAirport(city)
            console.log(city);
            cityValEl.value = ""
        }
        else {
            alert("please enter a valid city name")
        }
    }
    
    var getAirport= function(cityName) {
        var flightApi = "http://aviation-edge.com/v2/public/autocomplete?key=be6698-7715a2&city=" + cityName

        fetch(flightApi).then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    console.log(data)
                    displayAirports(data);
                })
            }
            else {
                alert ("server cant find relavent airport data!")
            }
        });
    
    }

    var displayAirports = function(airports){
        var airportsArray = airports.airportsByCities
        var iataCon = document.querySelector("#iataCodes");

        for ( let i = 0; i < airportsArray.length; i++ ) {
            var airportNames = airportsArray[i].codeIataAirport

            var codeEl = document.createElement("div")
            codeEl.classList = "card";

            var codeTitle = document.createElement("h3")
            codeTitle.textContent = airportNames;
            codeTitle.classList = "card-title"

            $(codeEl).append(codeTitle);
            $(iataCon).append(codeEl);
        }
    }
       
    
    formEl.addEventListener("submit", getAp);   
});