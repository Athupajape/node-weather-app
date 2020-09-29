const request=require('request');

const geocode=(address,callback)=>{
    const geoURL="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?types=address&proximity=-122.39738575285674,37.7925147111369453&access_token=pk.eyJ1IjoiYXRoYXJ2YXAyMiIsImEiOiJja2ZjaGVlaWIwY28zMnVwdHJ1MnBkdG1oIn0.44o35gkt41GnyT2Mp9HkAA&limit=1"

    request({
        url:geoURL,
        json:true
    },(error,{body})=>{
        if(error){
            callback("Unable to connect to location service",undefined);
        }else if(body.features.length===0){
            callback("Unable to find location.Try another search",undefined);
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;