 



L.mapbox.accessToken = 'pk.eyJ1IjoiaGVsbHVpbiIsImEiOiJjaXY5Mjh3ejkwMGRyMnRwYzJkNXl4OGkxIn0.7Ram_00U6U26M5NKFnqvxw';


numOfPrecinct= precinct.features.length;
console.log(precinct.features.length);
 
 

var map = L.mapbox.map('map', 'mapbox.light')
    .setView([27.76, 82.5], 12);


for(var i=0; i<70; i ++) { 

    var numOfVotes_DEM;
    var numOfVotes_REP; 

   //GETTING BOUNDING BOX OF CURRENT PRECINCT
   var boundingBox=turf.bbox(precinct.features[i]);

   //GETTING CURRENT PRECINCT CODE
   var currentPrecinct=precinct.features[i].properties.PRECINCT;

   //LOOK FOR PRECINCT BASED ON CODE IN THE VOTES DATASET
   for (var k=0; k<votes.length; k ++ ) { 
    console.log (votes[k].Party.toUpperCase());
     if (votes[k].Precinct  == currentPrecinct  && 
        votes[k].Party.toUpperCase() == "DEM") { 
         numOfVotes_DEM=votes[k].Votes; 
         drawDots(numOfVotes_DEM, "rgb(0,0,255)"); 

     } else if(votes[k].Precinct  == currentPrecinct  && 
        votes[k].Party.toUpperCase() == "REP"){ 
         numOfVotes_REP=votes[k].Votes; 
         drawDots(numOfVotes_REP, "rgb(255,0,0)"); 
     }  

   }

}

 
 function drawDots(num, color) { 
    console.log("drawing!");
   var poly=turf.bboxPolygon(boundingBox) ;
   var x_min=boundingBox[0];
   var x_max=boundingBox[2];
   var y_min=boundingBox[1];
   var y_max=boundingBox[3]; 
  
   var j=0; 
   while(j<num){ 
       var lat = y_min + (Math.random() * (y_max - y_min));
       var lng = x_min + (Math.random() * (x_max - x_min));

       var point  = turf.point([lng, lat]);
       var inside = turf.inside(point, precinct.features[i]);
         
         if (inside) {
           // L.mapbox.featureLayer(point, {
           // pointToLayer: function(feature, latlon) {
           // return L.circleMarker(latlon, {
           // fillColor: color,
           // fillOpacity: 0.5,
           // stroke: false,
           // radius:1,
           // });
           // }
           //  }).addTo(map);
           j+=1; 

            
        }  
   }
}



// var precinctLayer = L.mapbox.featureLayer(precinct)
//     .addTo(map);
// When map loads, zoom to libraryLayer features
map.fitBounds(precinctLayer.getBounds());

//console.log(L.mapbox);






