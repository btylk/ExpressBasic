var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');

router.get('/', function(req, res, next){
    res.render('data');
});

router.get('/add', function(req, res, next){
    res.render('addData');
});

router.post('/add',[
    body("Name","Please type your name/org").not().isEmpty(),
    body("Details","Please type your details").not().isEmpty()
], function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
    }
    console.log(req.body.Name);
    console.log(req.body.Details);
});
module.exports = router;