//modules
var express = require('express');
var mongodb = require('mongodb');
var route = require('./app.js')
require('dotenv').config({silent:true});

//mongodb mLab URI
var url = process.env.MONGOLAB_URI;


//function
var app = express();


//database
var MongoClient = mongodb.MongoClient;

//settings
app.set('port',(process.env.PORT || 5000));
app.use(express.static('public'));

//connect to database
MongoClient.connect(url,function(err,db){

  if(err){
    console.log('There was an error connecting to the database')
  }
  else{
    console.log('Successfully connected to the database');

    //route function in app.js
    route(app,db);

  }
})

app.listen(app.get('port'),function(){
  console.log('listening on port: '+app.get('port'));
})
