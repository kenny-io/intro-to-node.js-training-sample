
const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const pg = require('pg');
const app = express();

/*update the DATABASE value in `variables.env` with your postgress server uri*/
const conString = process.env.DATABASE || 'postgress://localhost:5432/node_sample_db'

pg.connect(conString, function (err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('SELECT $1::varchar AS my_first_query', ['node_sample_db'], function (err, result) {
    done()
    if (err) {
      return console.error('error happened during query', err)
    }
    console.log(result.rows[0])
    process.exit(0)
  })
})
// template to get user details
app.get('/addUser', function (req, res) {
    //update the form-action in this template to '/addUser'
      res.render('addUser')
    })
//post endpoint
app.post('/addUsers', function (req, res, next) {
    const user = req.body
    pg.connect(conString, function (err, client, done) {
      if (err) {
        // pass the error to the express error handler
        return next(err)
      }
      // add user to database
      client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
        done() 
        /*this done callback signals the pg driver that the connection can be closed or         returned to the connection pool*/
        if (err) {
          // pass the error to the express error handler
          return next(err)
        }
        res.send(200)
      })
    })
  })
/** Here we create the table for users
 * 
CREATE TABLE users(
    username VARCHAR(20),
    age SMALLINT
  );
  Uncomment and add it appropriately to run code
 */
