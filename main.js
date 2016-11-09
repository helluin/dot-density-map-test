 
 

var csvWriter=require("csv-write-stream");
var writer=csvWriter();
var fs=require("fs");
var turf=require("@turf/turf");
var precinct=require("./reader"); 
var votes=require("./jsonReader");


writer.pipe(fs.createWriteStream("test.csv")); 



//L.mapbox.accessToken = 'pk.eyJ1IjoiaGVsbHVpbiIsImEiOiJjaXY5Mjh3ejkwMGRyMnRwYzJkNXl4OGkxIn0.7Ram_00U6U26M5NKFnqvxw';


numOfPrecinct= precinct.features.length;
console.log(precinct.features.length);

for(var i=0; i<numOfPrecinct; i ++) { 

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
         createDots_DEM(numOfVotes_DEM ); 

     } else if(votes[k].Precinct  == currentPrecinct  && 
        votes[k].Party.toUpperCase() == "REP"){ 
         numOfVotes_REP=votes[k].Votes; 
         createDots_REP(numOfVotes_REP ); 
     }  

   }

}

 
function createDots_DEM(num) { 
  console.log("a vote for DEM!");
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
           //writer.write({ "x": lng, "y":lat })
         j+=1;           
      }  
 }
}


function createDots_REP(num) { 
  console.log("a vote for REP");
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
            writer.write({ "x": lng, "y":lat })
         j+=1;           
      }  
 }
}


 

