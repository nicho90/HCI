/**
 * Created by Andre on 07.11.2015.
 */
/**
 * Created by Andre on 30.10.2015.
 */
var express = require('express');
var router = express.Router();
var diaries = require('./functions/APIDiaries')();
var nasatlx = require('./functions/APInasatlx')();
var umux = require('./functions/APIumux')();
var survey = require('./functions/APIsurvey')();
var userId = require('./functions/getid')();

router.get('/diaries', function(req,res,next) {
    diaries.getEntries(function(result){
        res.send(result)
    })
});
router.get('/nasatlx/:id', function(req,res,next) {
    var userId = req.cookies.uniqid;
    console.log('hello')
    if (req.params.id === 'all') {
        nasatlx.getEntries(function(result) {
            res.send(result)
        })
    }
    else if ( req.params.id === 'myResult' ) {

        res.redirect('/result/nasatlx/'+userId)
    }
    else {
        nasatlx.getEntryByID(function(result) {
            res.send(result)
        }, req.params.id)
    }
});
router.get('/umux', function(req,res,next) {
    umux.getEntries(function(result){
        res.send(result)
    })
});
router.get('/survey/:id', function(req,res,next) {
    var userId = req.cookies.uniqid;
    if (req.params.id === 'all') {
        survey.getEntries(function(result) {
            res.send(result)
        })
    }
    else if ( req.params.id === 'myResult' ) {

        res.redirect('/result/survey/'+userId)
    }
    else {
        survey.getEntryByID(function(result) {
            res.send(result)
        }, req.params.id)
    }
});
module.exports = router;