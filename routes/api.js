/**
 * Created by Andre on 30.10.2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbConnections = require('../config/dbs');
console.log(dbConnections);
mongoose.connect(dbConnections.MongoDB);
var diaries = require('./functions/APIDiaries')();
var nasatlx = require('./functions/APInasatlx')();
var umux = require('./functions/APIumux')();
var survey = require('./functions/APIsurvey')();

router.post('/diaries', function(req, res, next) {
  if (req.body.userId != undefined && req.body.device != undefined && req.body.reason != undefined ) {
    diaries.createEntry(function(result){
      res.send(result)
    },req.body)
  }
  else {
    res.send({success: false, message: 'missing or false input'})
  }
});
router.get('/diaries', function(req,res,next) {
  diaries.getEntries(function(result){
    res.send(result)
  })
});
router.post('/nasatlx', function(req, res, next) {
  if (req.body.userId != undefined &&
      req.body.mentalDemand != undefined &&
      req.body.temporalDemand != undefined &&
      req.body.performance != undefined &&
      req.body.effort != undefined &&
      req.body.frustration != undefined &&
      req.body.physicalDemand != undefined ) {
    nasatlx.createEntry(function(result){
      res.send(result)
    },req.body)
  }
  else {
    res.send({success: false, message: 'missing or false input'})
  }
});
router.get('/nasatlx', function(req,res,next) {
  nasatlx.getEntries(function(result){
    res.send(result)
  })
});
router.post('/umux', function(req, res, next) {
  umux.createEntry(function(result){
    res.send(result)
  },req.body);
});
router.get('/umux', function(req,res,next) {
  umux.getEntries(function(result){
    res.send(result)
  })
});
router.post('/survey', function(req, res, next) {
  survey.createEntry(function(result){
    res.send(result)
  },req.body);
});
router.get('/survey', function(req,res,next) {
  survey.getEntries(function(result){
    res.send(result)
  })
});
module.exports = router;