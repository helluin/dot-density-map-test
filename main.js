
//   =========================
//   ---- GLORIOUS NOTES -----
//   =========================
 // 1. BEWARE DATA TYPE&FORMATS
 //For Hernando, the data type from the .json file is string and it's formatted with commas
 //Even parseInt() would not solve the problem. While it can convert string to number, it only returns what's before the comma. 
 //E.g. The datum is "1,023", then parseInt() would return 1 instead of 1023. 
 

 

var csvWriter=require("csv-write-stream");
var writer=csvWriter();
var fs=require("fs");
var turf=require("@turf/turf");
var precinct=require("./geoJSON/precinct_Hernandos"); 
var votes=require("./source_data/JSON_Hernandos");

writer.pipe(fs.createWriteStream("Dots_Hernando_DEM.csv")); 

numOfPrecinct= precinct.features.length;



for(var i=0; i<numOfPrecinct; i ++) { 

    var numOfVotes_DEM;
    var numOfVotes_REP; 


   //GETTING BOUNDING BOX OF CURRENT PRECINCT
   var boundingBox=turf.bbox(precinct.features[i]);

   //GETTING CURRENT PRECINCT CODE
   var currentPrecinct=precinct.features[i].properties.PRECNCTNO;
   console.log("Inspecting votes in precinct: " + currentPrecinct); 

   console.log("This is the "+i+"th precinct");

   //LOOK FOR PRECINCT BASED ON CODE IN THE VOTES DATASET
   for (var k=0; k<votes.length; k ++ ) { 
      
     if (votes[k].Precinct  == currentPrecinct  && 
        votes[k].Party.toUpperCase() == "DEM") { 

         numOfVotes_DEM=votes[k].Votes; 
        //console.log("about to draw for DEM")
         createDots(numOfVotes_DEM ); 


     } 
     else if(votes[k].Precinct  == currentPrecinct  && 
        votes[k].Party.toUpperCase() == "REP"){ 
        
         numOfVotes_REP=votes[k].Votes; 

         //createDots(numOfVotes_REP ); 
         //console.log( numOfVotes_REP);
         //console.log( parseInt(numOfVotes_REP));

     }  

   }

}

 
function createDots(num) { 
  //console.log("a vote for DEM!");
 var poly=turf.bboxPolygon(boundingBox) ;
 var x_min=boundingBox[0];
 var x_max=boundingBox[2];
 var y_min=boundingBox[1];
 var y_max=boundingBox[3]; 
 console.log("There are " + num +" points to be drawn in this precinct"); 
 var j=0;

 // console.log( parseInt(num));
 // console.log(j<parseInt(num));
 while(j<num){ 
     var lat = y_min + (Math.random() * (y_max - y_min));
     var lng = x_min + (Math.random() * (x_max - x_min));

     var point  = turf.point([lng, lat]);
     var inside = turf.inside(point, precinct.features[i]);
       
       if (inside) {
          writer.write({ "x": lng, "y":lat })
         console.log("Now drawing the "+ j + "th point");
         j+=1;              
               
      }  
 }
}

 

