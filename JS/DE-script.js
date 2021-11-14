$(document).ready(function() {
    var getAirport= function() {
        var flightApi = "http://aviation-edge.com/v2/public/autocomplete?key=be6698-7715a2&city=new york"

        fetch(flightApi).then(function(response) {
            if(response.ok){
                response.json().then(function(data) {
                    console.log(data);
                })
            }
        });
    
    }
       
    
    getAirport();   
});