var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pinterest' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Pinterest | Register' });
});

module.exports = router;
