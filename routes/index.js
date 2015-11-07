var express = require('express');
var router = express.Router();

// GET Home-page
router.get('/', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/index.html');
  response.end();
});

// GET SUS-page
router.get('/sus', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/sus.html');
  response.end();
});

// GET UMUX-page
router.get('/umux', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/umux.html');
  response.end();
});

// GET NASA-TLX-page
router.get('/nasatlx', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/nasatlx.html');
  response.end();
});

// GET Survey-page
router.get('/survey', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/survey.html');
  response.end();
});

// GET diaries page
/*router.get('/diaries', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/diaries.html');
  response.end();
});

router.get('/diary', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/diary.html');
  response.end();
});*/

module.exports = router;
