var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var mongoUrl = process.env.MONGOLAB_URI;
var dbName = 'urlshortener';
var collectionName = 'url';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { url:req.protocol+'://'+req.hostname });
});

router.get('/:id',function(req,res,next){
  var id = req.params.id;
  mongo.connect(mongoUrl,function(err,mongodb){
    var db = mongodb.db(dbName);
    var collection = db.collection(collectionName);
    collection.find({_id:+id}).toArray(function(err,docs){
      if(err) throw err;
      console.log(docs);
      if(docs[0]) {
        res.redirect(301,'https://'+docs[0].url);
      } else {
        res.redirect('/');
      }
      next();
      mongodb.close();
    });
    
  });
});


module.exports = router;
