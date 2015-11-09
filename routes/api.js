/**
 * Created by Andre on 30.10.2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbConnections = require('../config/dbs');
mongoose.connect(dbConnections.MongoDB);

var diaries = require('./functions/APIDiaries')();
var nasatlx = require('./functions/APInasatlx')();
var umux = require('./functions/APIumux')();
var sus = require('./functions/APIsus')();
var survey = require('./functions/APIsurvey')();
var userId = require('./functions/getId')();


// DIARIES
router.post('/diaries', function(req, res, next) {
  if (req.body.userId != undefined && req.body.device != undefined && req.body.reason != undefined ) {
    diaries.createEntry(function(result){
      res.send(result);
    },req.body);
  }
  else {
    res.send({success: false, message: 'missing or false input'})
  }
});

router.get('/diaries', function(req,res,next) {
    diaries.getEntries(function(result){
        res.send(result);
    });
});


// NASA-TLX
router.post('/nasatlx', function(req, res, next) {
  var userId = req.cookies.uniqid;
  req.query.userId = userId;
  if (req.query.mentalDemand != undefined &&
        req.query.temporalDemand != undefined &&
        req.query.performance != undefined &&
        req.query.effort != undefined &&
        req.query.frustration != undefined &&
        req.query.physicalDemand != undefined ) {
    nasatlx.createEntry(function(result){
        console.log(result);
        res.send(result);
    },req.query);
  }
  else {
    res.send({success: false, message: 'missing or false input'});
  }
});

router.get('/nasatlx', function(req,res,next) {
    nasatlx.getEntries(function(result){
      res.send(result);
  });
});


// UMUX
router.post('/umux', function(req, res, next) {
    var userId = req.cookies.uniqid;
    req.body.userId = userId;
    if (req.body.question_1 != undefined &&
        req.body.question_2 != undefined &&
        req.body.question_3 != undefined &&
        req.body.question_4 != undefined ) {

        umux.createEntry(function(result){
            res.redirect('/results-umux.html');
        },req.body);
    } else {
        res.send({success: false, message: 'missing or false input'});
    }
});


// SUS
router.post('/sus', function(req, res, next) {
    var userId = req.cookies.uniqid;
    req.body.userId = userId;
    if (req.body.question_1 != undefined &&
        req.body.question_2 != undefined &&
        req.body.question_3 != undefined &&
        req.body.question_4 != undefined &&
        req.body.question_5 != undefined &&
        req.body.question_6 != undefined &&
        req.body.question_7 != undefined &&
        req.body.question_8 != undefined &&
        req.body.question_9 != undefined &&
        req.body.question_10 != undefined ) {

        sus.createEntry(function(result){
            res.redirect('/results-sus.html');
        },req.body);
    } else {
        res.send({success: false, message: 'missing or false input'});
    }
});


// SURVEY
router.post('/survey', function(req, res, next) {
  var userId = req.cookies.uniqid;
    console.log(req);
  req.body.userId = userId;
    if(req.body.firstCB != undefined) {
        req.body.firstCB = true;
    }
    else {
        req.body.firstCB = false
    }
    if(req.body.secondCB != undefined) {
        req.body.secondCB = true;
    }
    else {
        req.body.secondCB = false
    }
    if(req.body.thirdCB != undefined) {
        req.body.thirdCB = true;
    }
    else {
        req.body.thirdCB = false
    }
    if(req.body.fourthCB != undefined) {
        req.body.fourthCB = true;
    }
    else {
        req.body.fourthCB = false
    }
  survey.createEntry(function(result){
    res.redirect('/result/survey/'+userId);
  },req.body);
});

router.get('/survey', function(req,res,next) {
  survey.getEntries(function(result){
    res.send(result);
  })
});

// Diary

// SUS
router.post('/diary', function(req, res, next) {
    var userId = req.cookies.uniqid;
    req.body.userId = userId;
    var now = new Date().getTime();
    if (req.body.question_1 != undefined &&
        req.body.question_2 != undefined ) {

        diaries.createEntry(function(result){
            res.redirect('/diary.html?saved=yes&t='+now);
        },req.body);
    } else {
        res.send({success: false, message: 'missing or false input'});
    }
});


// USER
router.get('/userId', function(req,res,next) {
  userId.getID(function(result){
    res.send(result);
  })
});



// TEST
router.post('/test', function(req,res,next) {
  console.log(req.body);
  console.log(req.cookies.uniqid);
  res.redirect('/');
});

module.exports = router;
