var express = require('express');
var app = express();
var ttn = require("ttn");

const appID = "ipslora"
const accessKey = "ttn-account-v2.mTFXZKHzUxTfglEGCaaFQsMHsyb5mzSRvUU4jUEWLGs"
 
// discover handler and open mqtt connection
var hr =0;
var temp = 0;
var lat=11.0812;
var lon=76.9888;

// discover handler and open mqtt connection
ttn.data(appID, accessKey)
  .then(function (client) {
    client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      if (payload.port == 2){
       lat = payload.payload_fields.lat;
       lon = payload.payload_fields.lon;
       console.log(lat,lon);
       }
      else if (payload.port == 3){
       temp = (payload.payload_fields.Temp);
       temp=Number(temp);
       console.log(temp);
      }
      else if (payload.port == 4){
      hr = payload.payload_fields.hr;
      hr=Number(hr);
      console.log(hr);
      }
    })
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  });

app.get("/",function(req,res){
    res.render("home.ejs",{hr:hr,temp:temp,lat:lat,lon:lon});
})

app.listen("8000",function(){
    console.log("Server started");
})