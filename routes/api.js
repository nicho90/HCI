/**
 * Created by Andre on 30.10.2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbConnections = require('../config/dbs');
console.log(dbConnections)
mongoose.connect(dbConnections.MongoDB);
var diaries = require('./functions/APIDiaries')();

router.post('/diaries', function(req, res, next) {
  if (req.body.userId != undefined && req.body.device != undefined && req.body.reason != undefined ) {
    console.log('hallo')
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
})
module.exports = router;