# Exercise 5: REST API’s

**Overview**

This exercise will focus on the core concepts of Restful API architecture. We will understand the various REST representations, HTTP methods and the Restful web services. Furthermore, this module will exemplify Restful concepts to provide  a more hands-on experience as we’ll build a simple REST API in our Node.js application.

We can’t fully explain the concepts of REST API’s without first understanding what the term means. So lets look at the individual acronyms to shine more light on them:

**REST**

[REST](https://www.codementor.io/restful/tutorial/rest-api-design-best-practices-strategy) is an acronym for Representational State Transfer. It is web standards architecture and HTTP Protocol. RESTful applications use HTTP requests to perform four basic operations termed as CRUD (C: create, R: read, U: update, and D: delete).  We’ll look deeper into these operations later in this exercise.

**API**

API is an acronym for **Application Programming Interface.** It is a set of programming routines, protocols, instructions and standards for accessing a web based application. It is simply the layer of an application that can interact with other applications.


![basic api → app diagram](https://cdn-images-1.medium.com/max/800/1*eDrytuczv0tP7Fod1nU8NQ.png)


Looking at it as if our app is asking for data to an external app, we must first create the request in the correct format and send it to the app API we want to get the data from. The API reads the request, asks for the data to the app, then creates a response to the request and sends it back to our app.

In general, REST is a design pattern, a way of designing a web application to expose resources on the web, using HTTP protocols. Then using API’s we can request for these resources from the web or even send data to that web page through a `URL` (endpoint) like :

```
    http://www.myblog.com/users/userId
    http://www.myblog.com/posts/34
```

The ways through which we interact with this resources are called operations. 

**Task 1: Understanding REST Operations**

To make operations on resources, REST uses pairs of request and responses, through four major  HTTP methods or verbs:

- GET: to read a resource.
- POST: to create a resource.
- PUT: to update a resource.
- DELETE: to delete a resource.

To better understand the REST Operations and HTTP Methods, we’ll build a simple REST API to help us store users to our mongoDB database. This API will equally allow us perform CRUD operations on the list of users we save to our database.

**Task 2: Implementing REST API in Node.js**

In this task, we’ll develop an API where we’ll manage users. The flow is we will add users to our database and then perform CRUD operations on the users we have in the database.

Now in your project root folder, create a new file called `apiindex.js` and update with this:

```javascript
    var express = require("express");
    var app = express();
    var bodyParser = require("body-parser");
    var methodOverride = require("method-override");
    var mongoose = require("mongoose");
    
    // App configuration
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(methodOverride());
    app.get("/apiindex", function(req, res) { 
     res.send("We'll set up our API here !!");
    });
    
    app.listen(3030, function(){
     console.log("API server listening on port 3030");
    })
```

Notice that we added another module `methodOverride`, it is a Node module that lets you use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it. So navigate back to your terminal and install it with:

```bash
    $ npm install method-override --save
```

This will add the methodOverride module to our package.json file and we can then run this file in the terminal with :

```bash
    $ node apiindex
    
    // "this will log API server listening on port 3030 on the console"
```

Then open your browser and navigate to `127.0.0.1:3030/apiindex` and you will get this output:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_F1C2D8422225F8FE9C031B22833D81B7BBF571D20AF525798AA7B3D233BED225_1525869358312_apiindex.jpg)


**Task 3: Creating our app Model**

Cool, we are all set up! now lets create a model for our app. In the last exercise we had all our codes inside the `index.js` file so as not to complicate things by creating numerous folders and files. With your experience from that exercise, we’ll go ahead and better arrange our code structure by creating models in this exercise. Inside the project root, create a new folder called `models`. 

The Model will represent the information of the application and the rules used to manipulate the data. In our case, our model will represent a user. Inside the `models` folder, create a new file called `users.js` and set it up like so:

```javascript
    var mongoose = require("mongoose");
    var UserSchema = new mongoose.Schema({ 
      username: { type: String, required: true },
      age: { type: String, required: true }
    });
    var User = mongoose.model("users", UserSchema);
    module.exports = {
     UserModel: User
    };
```

This file contains the representation of a users name and age. We have also defined a `Schema` with which we’ll store these details to our database.
Then, we use `module.exports` to export this model file so we can use it from other files. To finally connect to our database, go back to `apiindex,js` file and add this line:

```
    mongoose.connect(process.env.DATABASE);
```

**Task 4: Implementing CRUD Operations**

Now, we have to modify our `apiindex.js` file, such that we will be  able to create, read, update & delete users from our database. To manage what our app will do for every route or action requested, we will use a controller. So within your project root directory, create a new folder called `controllers`. Inside this folder, create a new file called `UsersController.js` and add this code to it:

```javascript
    var User = require("../models/users.js");
    // Inserts a user to the db
    exports.create = function(req, res){
        ...
    };
    // Finds a single user in the db
    exports.readOne = function (req, res) {
        ...
    };
    // Finds a all users in the db
    exports.readAll = function (req, res) {
        ...
    };
    // Updates a user from the db
    exports.update = function(req, res) {
        ...
    };
    // Deletes a user from the db
    exports.delete = function(req, res) {
        ...
    };
```

**Task 4: HTTP methods**

These functions will simply perform the defined CRUD operations on the users in our database. You can find their respective codes on this gist. Now let’s setup our `apiindex.js` file with the appropriate HTTP methods that will handle our routes responses. Let’s update our `apiindex.js` file with this:

```javascript
    var UsersController= require("./controllers/UsersController");
    app.post("/users",UsersController.create); // Create
    app.get("/users/:id",UsersController.readOne); // Read One
    app.get("/users/",UsersController.readAll); // Read All
    app.put("/users/:id",UsersController.update); // Update
    app.delete("/users/:id",UsersController.delete); // Delete
```

These added lines simply tells our server that if it receives a POST request to the `'/users'` route, the routine ‘create’ in our `UsersController.js` file will manage it and so on. Also, there are two GET routes: `'/users'` and `'/users/:id'`. The first one will return all the users in our database while the second one will only display the user with the id used as argument.

**Task 5: Testing our REST API**

Now we have completed our REST API. To ensure that it works as expected, we’ll test it with `POSTMAN`. It is basically just a HTTP client for testing web services. Open it up if you have it installed on your system or simply download and install from [here](http://www.getpostman.com).

First, we’ll create our first user resource. Open POSTMAN and select a POST operation on `127.0.0.1:3030/users`. Now, fill in the keys and values section of the user you want to insert to the database. Finally, press the Postman **Send** and check the response from the server. If nothing goes wrong, you should receive a JSON with the data of the created user in the database.

**Summary**

In this exercise, we have gone through the core concepts of creating a REST API. We looked into the features of the REST concept and how it communicates with the API. For a more practical approach, we demonstrated the Operations and HTTP methods through the implementation of the API with our Node application when we built a simple REST API to manage users in a mongoDB database.


