const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast');


const app=express();
const port=process.env.PORT || 3000;

// Define paths for expressjs
const publicPathDirectory=path.join(__dirname,'../public');
const viewpath=path.join(__dirname,'../templates/views');
const partialpath=path.join(__dirname,'../templates/partials');

// Setup handlebars engine and views location.
app.set('view engine','hbs');
app.set('views',viewpath);
hbs.registerPartials(partialpath);

// Setup static directory to serve.
app.use(express.static(publicPathDirectory));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Atharva Paranjape'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Atharva Paranjape'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Atharva Paranjape'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        } 
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
                res.send({
                    forecastData:forecastData,
                    location,
                    address:req.query.address
                })
            
        })    
        }
    )
    // res.send({
    //     forecast:32,
    //     location:'Philadelphia',
    //     address:req.query.address
    // });
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Atharva Paranjape',
        error:'Help page not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Atharva Paranjape',
        error:'404 pagee not found.'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port);
});