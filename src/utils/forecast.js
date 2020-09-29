const request=require('request');

const forecast=(lat,lon,callback)=>{
    const url="http://api.weatherapi.com/v1/forecast.json?key=fe25b080d7a14a2caf240732202109&q="+lat+","+lon;

    request({
        url,
        json:true
    },(error,{body})=>{
        if(error){
            callback("Unable to connect to weather service",undefined)
        }else if(body.error){
            callback("Unable to find location",undefined)
        }else{
            callback(undefined,"It is currently "+body.current.temp_c+" degrees out.The humidity is "+body.current.humidity)
        }
    })
}

module.exports=forecast;