let cityName= document.querySelector('.weather_city');
let dateTime= document.querySelector('.weather_date_time');
let wForecast=document.querySelector('.weather_forecast');
let wIcon=document.querySelector('.weather_icon');
let wTemperature=document.querySelector('.weather_temperature');
let minTemp=document.querySelector('.weather_min');
let maxTemp=document.querySelector('.weather_max');

let wFeelsLike=document.querySelector('.weather_feelsLike');
let wHumidity=document.querySelector('.weather_humidity');
let wWind=document.querySelector('.weather_wind');
let wPressure=document.querySelector('.weather_pressure');

let inputForm=document.querySelector('.weather_search');

const getCountryName= (code)=>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}

const getDateTime= (date)=>{
    options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric" ,
        minute: "numeric",
    };

    return new Intl.DateTimeFormat("en-US", options).format(date*1000);
}

let city="Asansol";

const getWeatherData = async (city) => {
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4d301c29a73018071a3eda5b094089ad`;
    try{
        const res= await fetch(url);
        const data= await res.json();
        console.log(data);
        const {main, name, weather, wind, sys, dt}=data;
        cityName.textContent=`${name}, ${getCountryName(sys['country'])}`;
        dateTime.textContent=getDateTime(dt);
        wForecast.innerHTML=`${weather[0].main}`;
        wIcon.innerHTML=`<img src=" https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Image not Found">`;
        
        
        wTemperature.innerHTML=`${(main.temp-273).toFixed(2)}&#176C`;
        minTemp.innerHTML=`min:${(main.temp_min-273).toFixed(2)}&#176C`;
        maxTemp.innerHTML=`max:${(main.temp_max-273).toFixed(2)}&#176C`;
        wFeelsLike.innerHTML=`${(main.feels_like-273).toFixed(2)}&#176C`;
        wHumidity.innerHTML=`${(main.humidity)}%`;
        wWind.innerHTML=`${wind.speed}m/s`;
        wPressure.innerHTML=`${(main.pressure)}hPa`;
    }
    catch(error){
        console.log(error);
    }
}

document.body.addEventListener('load',getWeatherData(city));

inputForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let cityName=document.getElementById('city_name');
    getWeatherData(cityName.value);
    cityName.value="";
});