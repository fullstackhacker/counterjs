var router = require('express').Router();

router.get('/', function(req, res){
  if (req.session.counter){
    res.json({
      counter: req.session.counter
    });
    return req.session.counter++;
  }
  else {
    res.json 
  }
});

module.exports = router;
