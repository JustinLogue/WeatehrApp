const app={};

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
        var htmlstring1=`
        
        `
    })
}



$(function(){
    app.innit();
    
})