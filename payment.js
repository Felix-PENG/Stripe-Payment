'use strict'
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

var express = require("express");
const stripe = require("stripe")(keySecret);
var path    = require("path");
var bodyParser = require("body-parser");

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
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "USD",
    source: token
  }, function(err, charge){
    if(err & err.type == "StripeCardError"){
      console.log("Your card is rejected.");
    }
  });
  res.redirect('/paySuccess');
});

app.get('/paySuccess', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/paySuccess.html'));
});

app.get('/updatePayment', function(req, res){

});

app.listen(4567);


