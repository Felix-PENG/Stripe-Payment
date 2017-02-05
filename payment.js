'use strict'
const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const app = require("express")();
const stripe = require("stripe")(keySecret);
var path    = require("path");
var express = require('express');

app.use(express.static('public'));
// app.set('view engine', 'pug')

app.get("/", function(req, res){
  res.sendFile(path.join(__dirname+'/templates/login.html'));
});

app.get("/signup", function(req, res){
  res.sendFile(path.join(__dirname+'/templates/signup.html'));
});

app.get("/charge", function(req, res){
  res.sendFile(path.join(__dirname+'/templates/charge.html'));
});

app.get("/list", function(req, res){
  res.sendFile(path.join(__dirname+'/templates/list.html'));
});
// =======

// app.set("view engine", "html");
// app.use(require("body-parser").urlencoded({extended: false}));

// app.get("/", (req, res) =>
//   res.render("index.html", {keyPublishable}));
// >>>>>>> 59cd8462f9aa38e5953c797d47654b6729733980

app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));
});

app.get("/paySuccess", function(req, res){
  res.sendFile(path.join(__dirname+'/templates/paySuccess.html'));
});

app.get("/updatePayment", function(req, res){

});

app.listen(4567);


