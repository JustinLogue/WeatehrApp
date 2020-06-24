const app={};

var tempC = 0;
var tempCFeels = 0;
var Weather = "";
var WeatherDescription = "";
var windSpeed =  0;

app.innit = () =>{
    app.getWeather();
}

app.getWeather = () =>{
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=8f8837d6ef6a877cc98b102507a41189',
        method: 'GET',
        dataType: 'json',
    }).then(Result => {
        console.log("Results are: ", Result);
        tempC = Result.main.temp - 273.15
        tempC = parseFloat(tempC.toFixed(1));
        tempCFeels = Result.main.feels_like -273.15
        tempCFeels = parseFloat(tempCFeels.toFixed(1));
        Weather = Result.weather[0].main;
        WeatherDescription = Result.weather[0].description;
        windSpeed = Result.wind.speed;
        
        app.recommendations();
    })
}

app.recommendations = () =>{
    var htmlTemp=`
    <p>Temperature is ${tempC} but feels like: ${tempCFeels}<p>
    `
    $(".temp").append(htmlTemp);

    
    
    console.log(Weather);
    if(Weather == "Clouds")
        {var htmlSkyImg=`
        <img src="./assets/cloud.png" width="60%" height="60%"> 
        `
        $(".sky").append(htmlSkyImg);
        }
    else if (Weather == "Rain")
    {var htmlSkyImg=`
        <img src="./assets/rain.png" width="60%" height="60%">
        `
        $(".sky").append(htmlSkyImg);
        }
    else if (Weather == "Snow")
    {var htmlSkyImg=`
        <img src="./assets/snow.png" width="60%" height="60%">
        `
        $(".sky").append(htmlSkyImg);
        }
    else{
        var htmlSkyImg=`
        <img src="./assets/sun.png" width="60%" height="60%">
            `
        $(".sky").append(htmlSkyImg);
            
    }
    
    var htmlSky=`
    <p> Weather is:  ${WeatherDescription}
    `
    $(".sky").append(htmlSky);


    
}



$(function(){
    app.innit();
    
})