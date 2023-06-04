const express=require("express");
const app=express();
const https=require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const city=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=cdae98c71c0fe144c1fdbcb40eb6251f&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const humidity=weatherData.main.humidity;
      const description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imgURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temp is currently " +temp+" degrees celcius. </h1>");
      res.write("<h1>The humidity is currently " +humidity+". </h1>");
      res.write("<h1>The weather is currently " +description+". </h1>");
      res.write("<img src=" +imgURL+">");
      res.send();
    });

  });
});






app.listen(3000,function(){
  console.log("Server is running on port 3000.");
});
