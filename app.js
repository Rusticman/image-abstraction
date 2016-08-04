//modules
var path = require('path');
var Search = require('bing.search');
var util = require('util');
require('dotenv').config({silent:true});

//bing account key
var bingNr = process.env.BING_ACC_NR ;
//bing search function with key
var search = new Search(bingNr);


module.exports = function(app,db){

var collection = db.collection('img_abstraction');

app.get('/',function(req,res){
//Homepage
var file = path.join(__dirname +'/public/index.html');

res.sendFile(file,function(err){
  if(err){
    console.log('File could not be sent.')
  }
  else{
    console.log('Homepage sent.')
  }
})


});
//query search database with maximum 10 results
app.get('/api/latest/imagesearch',function(req,res){
//need to remove this now it's inserted, come back once I've finished the search images route.
 collection.findOne({"latestSearchDoc.docs":{$exists:true}},{"latestSearchDoc.docs":true},function(err,docs){
   if(err){
     console.log('problem accessing db.')
   }
   else{
     console.log('Found results.');
     res.json(docs.latestSearchDoc.docs.reverse());
   }
 })
})
//collects search and offset if specified
app.get('/api/imagesearch/:search',function(req,res){
//console.log(req.params.search)
//console.log(req.query.offset)
var offset = (req.query.offset || 0);
var searchReq = req.params.search;

if(!searchReq){
  res.send({error:'Search query is undefined.'})
}
searchReq = decodeURI(searchReq);

search.images(searchReq,{top:10,skip:offset},function(err,results){
if(err){
  console.log('there was an error retrieving results')
}
else{
//console.log(results);
var resultsArray = [];

results.forEach(function(elem){
var newElem = {url:'',snippet:'',context:'',thumbnail:''};

newElem.url = elem.url;
newElem.snippet = elem.title;
newElem.context = elem.sourceUrl;
newElem.thumbnail = elem.thumbnail.url;

return resultsArray.push(newElem);

})
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var date = new Date();

collection.findOneAndUpdate({"latestSearchDoc":{$exists:true}},{$push:{"latestSearchDoc.docs":{term:searchReq,when:date.getDate()+'-'+months[date.getMonth()+1]+ '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()} }},{returnNewDocument:true},function(err,docs){

  if(err){
    throw err;
  }
  else{
      console.log('successfully pushed new doc into database.');
      var searchQueries = docs.value.latestSearchDoc.docs;
      console.log(searchQueries);
      if(searchQueries.length >= 10){

        collection.findOneAndUpdate({"latestSearchDoc":{$exists:true}},{$pop:{"latestSearchDoc.docs": -1}},function(err,docs){
          if(err){
            console.log('there was an error popping array.')
          }
          else{
            console.log('array popped successfully')


          }

        })
      }

 }
})


if(!resultsArray){
  resultsArray = {error: 'Please refine your search and check example usage on the homepage.'}
}
  res.json(resultsArray);
}

})



})

app.get('/*',function(req,res){
  res.send({error:'Please check your URI request is valid.'})
})

}
