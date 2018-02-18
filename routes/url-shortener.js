var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGOLAB_URI;
var dbName = 'urlshortener';
var collectionName = 'url';

router.get('/new/:url',function(req,res){
    console.log(mongoUrl);
    var url = req.params.url;
    mongo.connect(mongoUrl,function(err,mongodb){
        var db = mongodb.db(dbName);
        var collection = db.collection(collectionName);
        collection.count(function(err,count){
            var id = count + 1;
            shortUrl = req.protocol+'://'+req.hostname+'/'+id;
            var urlObj = {_id:id,url:url,shortUrl:shortUrl};
            collection.insert({_id:id,url:url,shortUrl:shortUrl},function(err){
                res.send(urlObj);
                mongodb.close();
            });
        });
    });
});

module.exports = router;