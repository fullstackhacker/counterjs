var router = require('express').Router();
var counter = require('./counter');

router.use('/', counter);

module.exports = router;
