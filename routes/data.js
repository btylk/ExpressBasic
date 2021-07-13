var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('monk')('localhost:27017/ExpressDB')

router.get('/', function (req, res, next) {
    res.render('data');
});

router.get('/add', function (req, res, next) {
    res.render('addData');
});

router.post('/add', [
    body("Name", "Please type your name/org").not().isEmpty(),
    body("Details", "Please type your details").not().isEmpty()
], function (req, res, next) {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        res.render('addData', { errors: errors });
        console.log(errors)
    } else {
        //insert to db
        var data = db.get('Contacts');
        data.insert({
            Name:req.body.Name,
            Details:req.body.Details
        },function(err,Contacts){
            if(err){
                res.send(err);
            }else{
                req.flash("error", "Success");
                res.location('/data/add');
                res.redirect('/data/add');
            }
        })
    }
    console.log(req.body.Name);
    console.log(req.body.Details);
});
module.exports = router;