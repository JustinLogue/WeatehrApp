const app={};

var tempC = 0;
var tempCFeels = 0;
var Weather = "";
var WeatherDescription = "";
var windSpeed =  0;
var city = "";

app.innit = () =>{
    app.getCity();
}

app.getCity = () => {
    $("#submitCity").on('click', function(){
        $(".city").empty();
        $(".temp").empty();
        $(".sky").empty();
        $(".wind").empty();
        city= $('#City').val()
        // console.log("You entered: ", city)
        app.getWeather(city);
        
    })
}

app.getWeather = (city) =>{
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' +city+'&appid=8f8837d6ef6a877cc98b102507a41189',
        method: 'GET',
        dataType: 'json',
    }).then(Result => {
        console.log(Result)
        tempC = Result.main.temp - 273.15
        tempC = parseFloat(tempC.toFixed(1));
        tempCFeels = Result.main.feels_like -273.15
        tempCFeels = parseFloat(tempCFeels.toFixed(1));
        Weather = Result.weather[0].main;
        WeatherDescription = Result.weather[0].description;
        windSpeed = Result.wind.speed;
        // console.log("Results are: ", Result);
        console.log(WeatherDescription)
        if(WeatherDescription == "")
        {
            console.log("Error test");
            var errorpage= document.querySelector('.city');
            errorpage.style.display="block";
            const htmlerror=`
            <h2>Error! No City With that Name Found</h2>
            `
            $(".city").append(htmlerror);
        }
        else {
            
            var infopage= document.querySelector('.start');
            infopage.style.display="block";
            htmlcity=`
            <h2>Weather for the City of ${Result.name}</h2>
            `
            $(".city").append(htmlcity);
            app.recommendations();
        }
    })
}

app.recommendations = () =>{

    console.log(tempCFeels)

    if (tempCFeels >= 18 && tempCFeels <= 30 ){
        {var htmltempImg=`
        <img src="./assets/shorts.png" width="60%" height="60%"> 
        
        <p>Shorts and T-Shirt Weather <br>
        Temperature is ${tempC} <br> 
        but feels like: ${tempCFeels}<p>
        `
        $(".temp").append(htmltempImg);
        }
    }
    else if (tempCFeels < 18 && tempCFeels >= 10 ){
        {var htmltempImg=`
        <img src="./assets/tshirt.png" width="60%" height="60%"> 
        
        <p>Pants and T-Shirt Weather <br>
        Temperature is ${tempC} <br> 
        but feels like: ${tempCFeels}</p>
        `
        $(".temp").append(htmltempImg);
        }
    }
    else if (tempCFeels < 10 && tempCFeels >= 3 ){
        {var htmltempImg=`
        <img src="./assets/sweater.png" width="60%" height="60%"> 
        
        <p>Sweater Weather<br>
        Temperature is ${tempC} <br> 
        but feels like: ${tempCFeels}</p>
        `
        $(".temp").append(htmltempImg);
        }
    }
    else if (tempCFeels < 3 && tempCFeels >= -20 ){
        {var htmltempImg=`
        <img src="./assets/coat.png" width="60%" height="60%"> 
        
        <p>Winter Coat Weather<br>
        Temperature is ${tempC} <br>
        but feels like: ${tempCFeels}</p>
        `
        $(".temp").append(htmltempImg);
        }
    }
    else if (tempCFeels < -20 ){
        {var htmltempImg=`
        <img src="./assets/warning.png" width="60%" height="60%"> 
        <div class="freeze">
            <p>Warning! Absoultely Freezing Weather!<br>
            <Temperature is ${tempC} <br>
            but feels like: ${tempCFeels}</p>
        </div>
        `
        $(".temp").append(htmltempImg);
        }
    }
    else if (tempCFeels > 30 ){
        {var htmltempImg=`
        <img src="./assets/warning.png" width="60%" height="60%"> 
        <div class="heat">
            <p>Warning! Heat Stroke Weather!<br>
            <p>Temperature is ${tempC} <br> 
            but feels like: ${tempCFeels}</p>
        </div>
        `
        $(".temp").append(htmltempImg);
        }
    }


    // var htmlTemp=`
    // <p>Temperature is ${tempC} <br> but feels like: ${tempCFeels}<p>
    // `
    // $(".temp").append(htmlTemp);

    
    
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

    console.log(windSpeed)

    if (windSpeed < 11){
        {var htmlwindImg=`
        <img src="./assets/wind.png" width="60%" height="60%"> 
        
        <p>Light to no breeze</p>
        `
        $(".wind").append(htmlwindImg);
        }
    }
    else if (windSpeed >= 11 &&  windSpeed < 20){
        {var htmlwindImg=`
        <img src="./assets/wind1.png" width="60%" height="60%"> 
        
        <p>Strong breeze!</p>
        `
        $(".wind").append(htmlwindImg);
        }
    }
    else if (windSpeed > 20){
        {var htmlwindImg=`
        <img src="./assets/warning.png" width="60%" height="60%"> 
        
        <p>Warning! Gale to Hurricane!</p>
        `
        $(".wind").append(htmlwindImg);
        }
    }
    
}



$(function(){
    app.innit();
    
})