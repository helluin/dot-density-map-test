//var pt = {
//    "type": "Point",
//      "coordinates": [100, 0]
//    };
//var line = {
//    "type": "LineString",
//    "coordinates": [ [101, 0], [102, 1] ]
//  };
//var collection = turf.geometryCollection([[0,0],[10,10]]);



L.mapbox.accessToken = 'pk.eyJ1IjoiaGVsbHVpbiIsImEiOiJjaXY5Mjh3ejkwMGRyMnRwYzJkNXl4OGkxIn0.7Ram_00U6U26M5NKFnqvxw';
var map = L.mapbox.map('map', 'mapbox.light')
  .setView([38.05, -84.5], 12);
map.scrollWheelZoom.disable();