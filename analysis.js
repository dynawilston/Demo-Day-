// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
})

var baseMap = {
    "light map": lightmap
};

//var mymap = L.map('map').setView([41.8, -87.6], 13);
var map = L.map("map", {
    center: [41.8, -87.6],
    zoom: 11,
    layers: [lightmap]
});
L.control.layers(baseMap).addTo(map);

$.getJSON( "combined-review-data.json", function(data) {
    var data_pull = data;
    // console.log(data_pull);
    var markers_array = [];
    for (var i = 0; i < data_pull[1].length; i++) {
        if ([data_pull][1][rating] > 2 ) {
            var marker = L.marker([[data_pull][1][coordinates][latitude]], [[data_pull][1][coordinates][longitude]])
            .bindPopup("<h3>"+ [data_pull][1][alias] + "</h3><h3> Rating:" + [data_pull][1][rating] + "</h3>");

            markers_array.push(marker);
        }
    }
    
    // Create a layer group made from the bike markers array, pass it into the createMap function
    L.marker(markers_array).addTo(map)

});
