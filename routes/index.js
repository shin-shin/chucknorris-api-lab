var express = require('express');
var router = express.Router();
var request = require('request');

const CHUCK_URL = 'https://api.chucknorris.io/jokes/';

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('hey step 1');
  
  request(CHUCK_URL + "categories", (err, response, body) => {
    console.log('hey step 2');
    let cats = JSON.parse(body);
    console.log(req.query);
    if (req.query.category){
      console.log(`category specified`);
      request(`${CHUCK_URL}random?category=${req.query.category}`, function (err, response, body) {
        let joke = JSON.parse(body).value
        console.log(`joke: ${joke}`);

        res.render('index', {
          title: 'Chuck Norris Jokes',
          joke,
          cats
        });
      });
    } else {
      console.log(`category UNspecified`);
      res.render('index', {
        title: 'Chuck Norris Jokes',
        joke: "",
        cats
      });
    }

  })


});

module.exports = router;
