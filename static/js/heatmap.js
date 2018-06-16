//
// Running it for the first time can take a little bit of time
// becuase of overhead from alchemy
// but over time ( 1 -2 mins ) it is not longer and issues
// and fetches are almost instant
//

console.log("fetching data");
var heatMultiplier = 3;


fetch('/threatened_species')
  .then(response => response.json())
  .then(json => {
    let data = json.map(e => ({
      Countries: e[0],
      Mammals: e[1],
      Birds: e[2],
      Fishes: e[3],
      "Higher plants" : e[4],
      Total : e[5],
      Coordinates : e[6]+","+e[7],
      "Terrestrial protected areas(% of total land area )" : e[8]
    }) // e => callback
    ) // map
    plotPoints(data)
  }); // then


var mapbox = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZHlsYnVyZ2VyIiwiYSI6ImNqaHNkZXpyYTAxdDAzcXJ6dzA3NHR5dXMifQ.oZt5CGSYffy4dZqIFSQciQ'

var myMap = L.map('map', {
    // center: [37.7749, -122.4194],
    center:[0,0],
    zoom: 3
});

L.tileLayer(mapbox).addTo(myMap);


function plotPoints(data){
  console.log("plotPoints called");
  var countryArray = data.map(country => country["Countries"]);
  var totalArray = data.map(total => total["Total"]);
  var heatArray = data.map(d => d["Coordinates"].split(",").map(d => +d));
  var latitudeArray = heatArray.map(d => d[0]);
  var longitudeArray = heatArray.map(d => d[1]);

      data.forEach(function (d,i) {
          heatArray[i].push(+d.Total*heatMultiplier)

      });

      console.log(data[0]);


      var heat = L.heatLayer(heatArray, {
              radius: 15,
              blur: 15
          }
      ).addTo(myMap);




      for (var i = 0; i < heatArray.length; i++){
        L.marker([latitudeArray[i], longitudeArray[i]]).bindPopup("<h3>Country : " + countryArray[i] + "</h3>" + "<strong>Total: " + "</strong>" + "<strong>" + totalArray[i] + "</strong>").addTo(myMap);
        }


}
