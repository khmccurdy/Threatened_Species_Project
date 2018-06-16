//
// required file = config.js
// which contains an export mapboxToxen
//

mapboxToken = "pk.eyJ1Ijoic3dhdGlnaXJpIiwiYSI6ImNqaHkxanh2YTBoeGwzcW8xY294ZXYxamkifQ.hnFsM3Z_9aXYE7kY_XTQeQ"
var mapbox = `https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=${mapboxToken}`
var heatMultiplier = 3;

var myMap = L.map('map', {
    // center: [37.7749, -122.4194],
    center:[0,0],
    zoom: 3
});

L.tileLayer(mapbox).addTo(myMap);


d3.csv("/threatened_species.csv", function (data) {
    console.log(data);

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
    ).addTo(myMap)
});
