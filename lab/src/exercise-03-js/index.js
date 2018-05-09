const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env'});
const express = require('express')
const app = express()

 mongoose.connect(process.env.DATABASE);
 mongoose.Promise = global.Promise;
 mongoose.connection.on('error', (err)=>{
     console.log(`${err.message}`)
 })
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var userSchema = new mongoose.Schema({
    username: String,
    age: String
  });

var User = mongoose.model("User", userSchema);

 app.set('view engine', 'ejs')
 
 app.get('/', function (req, res) {
    res.render('index')
 })


 app.get('/name', function (req, res) {
    res.send('Hello Name!')
  })


  app.get('/addData', function (req, res) {
    res.render('addUser')
  })

  app.post('/addData', function (req, res) {
    res.type("application/json");
    var userData = new User(req.body);
    userData.save()
    .then(item => {
      res.send("user saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
    
  })
 
 app.listen(3030, function () {
   console.log('Example app listening on port 3030!')
 })

