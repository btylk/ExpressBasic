var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('data');
});

router.get('/add', function(req, res, next){
    res.send('Add more data');
});

module.exports = router;