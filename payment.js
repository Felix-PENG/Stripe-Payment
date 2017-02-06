'use strict'

const keyPublishable = 'pk_test_1zX2sGaxbQYs7Ke0IpcCan3V';
const keySecret = 'sk_test_Q4JWUjA2m8GfpIUZy4nHncmt';

var express = require('express');
var stripe = require('stripe')(keySecret);
var path    = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/login.html'));
});

app.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/signup.html'));
});

app.get('/charge', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/charge.html'));
});

app.get('/list', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/list.html'));
});
// =======

// app.set("view engine", "html");
// app.use(require("body-parser").urlencoded({extended: false}));

// app.get("/", (req, res) =>
//   res.render("index.html", {keyPublishable}));
// >>>>>>> 59cd8462f9aa38e5953c797d47654b6729733980

app.post('/charge',function(req, res){
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  var description = req.body.description;
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "usd",
    source: token
  }, function(err, charge){
    if(err){
      if(err.type == "StripeCardError"){
        console.log("Your card is rejected.");
      }
    }else{
      console.log("Success!")

      //update Payment records here
      var connection = mysql.createConnection({
        host     : 'http://modernservice.c4mnz6jezil1.us-east-1.rds.amazonaws.com',
        user     : 'ModernService',
        password : 'ModernService',
        port     : '3306'
      });

      connection.connect();

      connection.query("insert into payments('Description', 'Created','Amount','Currency') values (?, ?, ? ,'USD')", [description, new Date(),chargeAmount], function (error, results, fields) {
        if (error) throw error;
        console.log("Payment record has been pushed to database.");
      });

      connection.end();

      res.redirect('/paySuccess');
    }
  });
});

app.get('/paySuccess', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/paySuccess.html'));
});

app.listen(4567);


