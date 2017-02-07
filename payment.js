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
app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/login.html'));
});

app.post('/', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  /*
  var connection = mysql.createConnection({
    host     : 'http://modernservice.c4mnz6jezil1.us-east-1.rds.amazonaws.com',
    user     : 'ModernService',
    password : 'ModernService',
    port     : '3306'
  });

  var check = connection.query('SELECT * FROM customer WHERE email =' + email + ' AND password =' + password,function(err,rows){
    if(err) throw err;

    console.log('Data received from Db:\n');
    console.log(rows);
  });

  connection.end();
  connection.connect();
  */
  if(true){ // TODO check if email and pw match
  // if(check){
    console.log('Login Success!')
    res.redirect('/list');
  }
  else {
    console.log('Login Fail!')
    res.sendFile(path.join(__dirname+'/templates/loginFail.html'));
    // res.send(500,'Login Fail') 
    // warning without sending anything
  }
});

app.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname+'/templates/signup.html'));
});

app.post('/signup', function(req, res){
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var verify = req.body.verify;
  if(password == verify){
    //update new user record
    /*
    var connection = mysql.createConnection({
      host     : 'http://modernservice.c4mnz6jezil1.us-east-1.rds.amazonaws.com',
      user     : 'ModernService',
      password : 'ModernService',
      port     : '3306'
    });

    connection.connect();
    
    var check = connection.query('SELECT * FROM customer WHERE email =' + email + ' OR username =' + username,function(err,rows){
      if(err) throw err;
      console.log('check if name comflict');
    });

    if(check){
      console.log('Singup Fail!');
      res.send(500,'Singup Fail!');
    }
    else {
      connection.query("insert into customer('username', 'email','password') values (?, ?, ?)", [username, email, password], function (error, results, fields) {
        if (error) throw error;
        console.log("New user record has been pushed to database.");
      });
      console.log('Singup Success!');
      res.redirect('/');
    }

    connection.end();
    */

    //These two need to be deleted after db finished.
    console.log('Singup Success!');
    res.redirect('/');
  }
  else {
    console.log('Singup Fail!');
    res.sendFile(path.join(__dirname+'/templates/signUpFail.html'));
    // res.send(500,'Singup Fail!'); 
    // warning without sending anything
  }
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
        host     : 'modernservice.c4mnz6jezil1.us-east-1.rds.amazonaws.com',
        user     : 'ModernService',
        password : 'ModernService',
        port     : '3306',
        database : 'ModernService'
      });

      connection.connect();

      connection.query('INSERT INTO payments SET ?', {'description': description, 'created': new Date(), 'amount': chargeAmount, 'currency': 'USD'}, function (error, results, fields) {
        if (error){
          console.log(error);
        }
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


