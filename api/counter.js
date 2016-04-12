var router = require('express').Router();
var redis = require('redis');
var redisClient = require('../config').redisClient;

router.get('/', function(req, res){
  redisClient.get(req.session.id, function(err, counter){
    if (!!counter){
      return res.json({
        counter: counter
      });
    }
    else {
      return res.status(400).json({
        message: "Please initalize your counter."
      });
    }
  });
});

router.post('/', function(req, res){
  var start = req.body.start || 0;
  var number = false;
  try{
    number = Number(start);
  }
  catch (Exception){
    return res.status(400).json({
      error: `Invalid number: ${start}`
    });
  }
  res.json({
    counter: number
  });

  return redisClient.set(req.session.id, number, redis.print);
});

router.put('/', function(req, res){
  redisClient.get(req.session.id, function(err, counter){
    if (!!counter){
      counter = Number(counter);
      counter++;
      res.json({
        counter: counter
      });
      return redisClient.set(req.session.id, counter, redis.print);
    }
    else {
      return res.status(400).json({
        message: "An error occurred. Have you tried initializing your counter?"
      });
    }
  });
});

router.delete('/', function(req, res){
  req.session.destroy(function(err){
    if (!req.err){
      return res.json({
        error: "Unable to destroy your counter."
      });
    }
    return res.end();
  });
});

module.exports = router;
