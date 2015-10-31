var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/index.html');
  response.end();
});
/* GET sus page. */
router.get('/sus', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/sus.html');
  response.end();
});
/* GET umux page. */
router.get('/umux', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/umux.html');
  response.end();
});
/* GET nasatlx page. */
router.get('/nasatlx', function(req, res, next) {
  response.writeHeader(200, {"Content-Type": "text/html"});
  response.write('../public/nasatlx.html');
  response.end();
});

module.exports = router;
