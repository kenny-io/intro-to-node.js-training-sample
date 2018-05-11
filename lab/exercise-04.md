# Exercise 4: Database and ORM

**Overview**

Here we’ll look into Node.Js Databases and relational mapping modules. We’ll further explain how to use Node.Js ORM and the supported databases like MySQL, MongoDB and so on. In the process we’ll set up mongodDB and build a Node application that stores users into a mongoDB  and PostgreSQL databases. Before we dive into all that, it is important that we understand what Data storage means.


## Task 1: Data Storage

In this task you will understand the concept of data storage in Node.js applications and how to decide and compare ways of storing data.
Serving static pages for users as you have seen in the previous modules can be suitable for landing pages, or for personal blogs. However, if you want to deliver personalized content, you have to store the data somewhere.

Consider a simple example of registering a user. You can serve customized content for individual users as they sign up or make it available for them after identification only.

If a user wants to sign up on your application, you might want to create a route handler to handle the process like so:

```javascript   
    const users = []
    app.post('/users', (req, res)=> {
        // retrieve user posted data from the body
        const user = req.body
        users.push({
          name: user.name,
          age: user.age
        })
        res.send('successfully registered')
    })

```


This way you can store each new user in a global **users** variable, which will reside in memory for the lifetime of your application. Using this method might be problematic for several reasons:

- RAM is expensive,
- Memory resets each time you restart your application,
- If you don't clean up, sometimes you'll end up with stack overflow.

This is the reason why we need more sophisticated storage techniques and tools and this is where real databases come in.


## Task 2: Understanding Databases

Here’ll we’ll dive deeper into databases, explore the different types and equally see their advantages. You will understand what types you should use and the qualities to look out for.

Using databases solves all the problems we had with the last technique of storing files in application memory or even in files. When we deal with databases, it is often best to explain how they work with respect to the two very distinct types of databases today. SQL and NoSQL databases. In this task you will understand the concept of SQL and NoSQL databases and we’ll also go ahead to setup MongoDB with our Node application for a more practical experience.

**SQL**

SQL is a query language designed to work with relational databases. SQL databases have a couple of flavors depending on the product you're using, but the fundamentals are the same in each of them. The data itself will be stored in tables, and each inserted piece will be represented as a row in the table, just like in Google Sheets, or Microsoft Excel.

Within an SQL database, you can define schemas. These schemas will provide a skeleton for the data you'll put in there. The types of the different values have to be explicitly set before you can store your data. For example, when you want to store the data of a user say (username and age), you'll have to define a table for that user data, and you also have to tell the database that it has a username which is a string, and age, which is of type integer.

**Pros**

SQL enables communicating with the databases and receive answers to complex questions in seconds.
SQL views the data without storing the it in the object. It adheres to a long-established, clear standard

**NoSQL**

NoSQL databases have become quite popular in the last decade. You can simply see it as an upgrade from the SQL. With NoSQL you don't have to define a schema and you can store any arbitrary JSON. This is handy with JavaScript because we can turn any object into a JSON pretty easily. 

However one has to be careful when using NoSQL databases because you can never guarantee that the data is consistent, and you can never know what is in the database.

**Pros**

NoSQL can handle large volumes of structured, semi-structured, and unstructured data
Interacts quickly
Flexible and object-oriented
Has an efficient, scale-out architecture


## Task 3: MongoDB

In this task we’ll setup a MongoDB database. MongoDB is one of the most popular NoSQL database and widely used in the Node.js community. We’ll go through the process of setting it up on a hosted service mLab to provide a better practical experience. We will also go over the process of manually setting up mongoDB for offline processes.

**Setting up MongoDB**

To get the database up and running we have two major options:

1. Use Database as a Service (DBaaS) 
2. Use a hosting service like mLab and host our mongoDB database ourselves.

We’ll be going with the later as it’ll provide you more experience in setting up your database even for production. So lets get started setting up on mLab.

**Setting up mLab**

Open [mLab](https://www.mlab.com), sign up and when successful, click the lightning **create a new** button.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525779955353_createNew.jpg)


This will load up a new page where you’ll select your preferred hosting location. In our case we’ll go with the default. Follow the arrows in the snippet below to select the Sandbox plan with the Free Tier:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525780055551_freeTier.jpg)


Click the continue button to launch a new page where you’ll be required to select your desired cloud region, select `US East` and click continue:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525780173052_region.jpg)


This will now open up a page where you’ll set up the database name. Let’s keep it simple and call our database `node_sample_db`:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525780258357_dbName.jpg)


Supply the database name and click the continue button. This will then launch the order summary page to lay out all the details that you have selected in the setup process for your confirmation:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525780550005_summary.jpg)


Now, click the submit order button to complete the database creation. you will now be directed to your databases:

![MongoDB databases](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525780606210_createdDB.jpg)


Now click on the just created database to pop up its details, connection url etc:

![node_sample_db databse on mLab](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525780880549_DB.jpg)


Notice that i have added a user to the database. To be able to connect to this database, navigate to the `Users` tab on this page and click the **Add database user** button. Fill your name and password and click **Create.** Also notice that we now have a URI link with which we can connect to this database from our Node application. 

Now we have our database and a database user. But how do we know if we have done it right ?. We’ll now try to establish a connection to this database using a mongoDB tool called `compass`. It allows us log into the database and visualize all the data that we have in it. Often it also allows us perform basic `CRUD` operations on any data we have on the database. 

This tool comes with mongoDB. If you have installed mongoDB, it should already be running on your machine by default, simply navigate through your open applications and find it. Copy the DATABASE uri in the last snippet to your clipboard and open the compass, it’ll automatically detect the values on your clipboard and set it up on the compass:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525782762690_compass.jpg)


Simply scroll down to the bottom of the page and click the connect button. This will now open the database with all available files in it. from here you can manipulate the files to add, remove or update the database. 

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525782974497_emptyDB.jpg)


However in our case, our database is completely empty. But the good thing is, now we have confirmed that our mLab hosted database works on mongoDB and we can now use it in our Node application.

If you would like to work offline or make requests to your database without internet connection, go ahead and manually download and install mongoDB on your system from [here](https://www.mongodb.com). If you’re on windows, open the link, select the mongoDB version relative to your OS version and download. Follow the usual prompts to install it and then run this command to verify your installation:

```bash
    //verify installation
    $ mongo --version
      v.3.6.0
    
    //run it, first cd into the 'bin' file and run
    $ mongod
    
    /* if you get any errors, go back into your windows /C: route,
      create a data folder and inside it, create a db folder.
      then run the command again*/
```
    

This should output some version numbers like `v3.6.0` if successfully installed. If you’re on a Mac, simply use the brew commands:


```bash
    //install mongoDB
    $ brew install mongodb
    
    //verify installation
    $ mongo --version
    
    //run the db
    $ sudo mongod
```

## Task 4: Connect mongoDB to Node application

Now that we have completed our mongoDB set up process, how do we connect it to our Node application so we can read and write to it ?. This task will provide a basic walk through to achieving this fit in very simple steps.

**Step 1: Install Dotenv and Mongoose**

Now we need to install the `dotenv` package so we can store our projects environment variables securely in it. Environment variables are the datas in our project that we want to keep secured and never commit to a public repo. Mongoose is like an interface for mongoDB that allows us interact with the mongoDB database.

To install the packages, navigate to the terminal and run:

```bash
   $ npm install dotenv mongoose
```

This will install the Dotenv and Mongoose package and they will be availabe in our project node modules folder. Next copy the *database uri link*  we got from the mLab database we created and paste it inside your projects `variables.env` file.  If the file doesn’t already exist in your project root directory, create it and set it up like so:


```env    
    NODE_ENV = developement
    DATABASE = mongodb://<dbuser>:<dbpassword>@ds217360.mlab.com:17360/node_sample_db
```
    


> replace DATABASE uri here with your own unique database uri from the node_sample_db image.

While creating your database user, you defined a username and password, now update the uri above with the details of that user, replace `<dbuser>` with the user’s username, in my case `chris` and the replace `<dbpassword>` with the password you set:


```env    
    NODE_ENV = developement
    DATABASE = mongodb://chris:node@ds217360.mlab.com:17360/node_sample_db
```
    

Refer to your `mlab` database for these details if you forget them.

**Step 2: Connect to database**

Now open your projects `index.js` file and update it like so:

```javascript
    const mongoose = require('mongoose');
    const express = require('express')
    const app = express()
    require('dotenv').config({ path: 'variables.env'});
    
     // connect to our database instance
     mongoose.connect(process.env.DATABASE);
     //set mongoose to use es6
     mongoose.Promise = global.Promise;
     //log errors
     mongoose.connection.on('error', (err)=>{
         console.log(`${err.message}`)
     })
     
     app.set('view engine', 'ejs')
     app.get('/', function (req, res) {
        res.render('index')
     })
     
     app.listen(3030, function () {
       console.log('Example app listening on port 3030!')
     })
```

Now we have successfully connected our Node application to the mongoDB database. Next let’s make an attempt to store data to the database. 

**Task 5: Add data to database**

This task will demonstrate how we can add data to our mongoDB database and perform some basic operations on it.

**Step 1: Create a template to add users**

Since we are rendering data to the screen using the ejs template, lets create another ejs file that will hold a form to collect a users name and age. This is how we’ll add them to our database. So inside the project `views` folder, create a new file called `addUser.ejs` and set it up like so:

```ejs
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Test</title>
    
      </head>
      <body>
        <div class="container">
          <fieldset>
            <form action="/addData", method="POST">
              <input name="username" type="text" class="ghost-input" placeholder="Enter username" required>
              <input name="age" type="text" class="ghost-input" placeholder="Enter  age" required>
              <input type="submit" class="ghost-button" value="Add User">
            </form>
          </fieldset>
        </div>
      </body>
    </html>
```

Here we simply have two inputs for the username and age, then a submit button to post the data to our database. Also notice that we are posting this data to the `/addData` endpoint. This template will look this when you run the app and navigate to the `'``/addData``'`  endpoint:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525797168435_addData.jpg)


Next we go back to `index.js` and define the route we added to our `form action` in the `addUser` template . Update the file `index.js` with this lines of code:

```javascript
     //... index.js
      app.get('/addData', function (req, res) {
        res.render('addUser')
      })
      app.post('/addData', function (req, res) {
        res.type("application/json");
        res.json(req.body);    
      })
```

Here we’ve simply rendered the `addUser` template in our `'/addData'` route and defined a post method that will return a json when ever we post data to the endpoint.
Now when you run the app and supply values to the inputs likes this:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525797215913_fill+addDAta+form.jpg)


You will get this result printed out on screen.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525797248038_addDataOutput.jpg)


Nice. This works but that’s not the goal. We intend to store these data into our database and not just print them on screen. To do that, we need to first create a database schema.

**Create a database schema**

Like we said earlier in the beginning of this exercise, databases needs schemas to help set the data type of the data that will be flowing into them. Once the user enters data in the input field and clicks the **Add User** button, we want the contents of the input field to be stored in the database. 

In order to know the format of the data in the database, we need to have a Schema.
For this tutorial, we will use a very simple Schema that has only two fields. I am going to call the fields username and age respectively. 

In `index.js` add this code to define our Schema:

```javascript
    var userSchema = new mongoose.Schema({
      username: String,
      age: String
    });
```

Now that we have the Schema set, lets create a `User` model from it. We’ll then use an instance of this model to add users to our database. Here’s how we create the mode, add this line of code just  below your Schema:


    const User = mongoose.model('User', userSchema);

Finally lets now use mongoose to save each user data to our database. Mongoose provides us a save function that will take a JSON object and store it in the database. Our body-parser middleware, will convert the user’s input into the JSON format. Now we’ll simply update our `'``addData/``'` endpoint to capture these features like so:

```javascript
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
        firstName: String,
        lastNameName: String
      });
    var User = mongoose.model("User", userSchema);
     app.set('view engine', 'ejs')
     //...
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
```
    

To save the data into the database, we created a new instance of our `User` model that we created earlier. We then passed into this instance the user’s input. Then we simply call the mongoose `.save()` method on the new model instance to save the details in `req.body` into our database.

Mongoose returns a promise when the save to the database completes. This save will either finish successfully or it will fail. Hence, the promise also provides two methods that will handle both scenarios.

If the save to the database was successful, it will return to the `.then()` callback segment of the promise. And if this is the case we want to send a text back to the user to let them know the data was saved to the database.

If it fails, it will return to the `.catch()` segment of the promise. In this case, we want to send text back to the user telling them the data was not saved to the database. 

It is best practice to also change the statusCode that is returned from the default 200 to a 400. A 400 statusCode signifies that the operation failed.

Now lets run the app again and check if our code works as expected. When we navigate to the `127.0.0.1:3030/addData` and supply username and age, we should get `item saved to database` printed on screen:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525862340350_UserSaved.jpg)


And here it is, just as expected!. Now if you open your mongoDB compass, you should now see that al your users are getting added to the database:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D5B2E5A967E6F06DB782CD59272B7D60D4CCF3D8A17086E038B9AB4FD9CBBA58_1525862398183_savedToCompass.jpg)



## Task 5: Node and PostgreSQL

In this task we are going to demonstrate how to set up a Node.js application with the PostgreSQL database. To have PostgreSQL up and running you have to install it on your computer but we’ll not go into the details of the installing Postgres, we’ll however provide a link where you can get that [installation guides](http://To have PostgreSQL up and running you have to install it on your computer). Working on the assumption that you now have Node.js installed on your computer, we’ll go ahead and demonstrate how to set it up with your Node.js application.

**Step 1: Install the pg Library**

With your Postgres server up and running on the default port 5432 or your custom port, making a database connection is easy with the [pg](https://www.npmjs.com/package/pg) library. Navigate to your terminal and run:

```bash
    $ npm install pg --save
```

This will now add the Postgresql package to our application module.

**Step 2:** **Create the database and users table**

The first thing as always will be to create the database where we’d like to store data. In Postgres, we all also create tables to hold each incoming data from the application. To create the database, navigate to your terminal and run :

```bash
    // first ensure that you have successfully installed postgreSQL
    $ pg --version
    v.3.4.x
    
    //create a postgres database called node_sample_db
    $ createdb node_sample_db
```
    

Now lets go back to our project folder and create a new file for this database. In your project root folder, create a new file called `postgresdb.js` and set it up like this:


```javascript
    const pg = require('pg')
    
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
```

Here we have just established a basic interaction with our Postgres database through our Node.js application. Next we’ll create a `users` table where we’ll define the contents to store in the database. So add :

```
    CREATE TABLE users(
      username VARCHAR(20),
      age SMALLINT
    );
```

We have specified just two variables, username and age.

**Add users to database**
Now let’s set up the routing system. We’ll define another endpoint `'/addUsers'` where we’ll post our user details to. When we receive the details (username and age) in the `req.body` object, we’ll then save it into our database. So update the the `postgresdb.js` file with this code:


```javascript
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
```

We have just saved a user ? but from where .. yeah we have not passed the details of this user. Lets now define another `'``/addUsers``'` endpoint that will get the details of this user and submit to our post endpoint. Again update the `postgresdb` file above with this code:

```javascript  
      app.get('/addUser', function (req, res) {
      //update the form-action in this template to '/addUser'
        res.render('addUser')
      })
```

Here we have simply rendered the `addUser` template we defined in our `views` folder. Now when you navigate to `127.0.0.1:3030/addUser` you get the same output as the mongoDB endpoint `127.0.0.1:3030/addData`. When you fill up the form and supply (username and age) and then submit the form, the user will be added to your `postgresdb` database.


## Summary

In this exercise we have understood what data storage is, we have seen a few ways o storing data. We have also demonstrated the pros of certain storage methods to help you decide on which to adopt. We went further to demonstrate how to set up and use mongoDB to store data on your Node application. Finally we used the same approach to also store data in PostgreSQL database.

