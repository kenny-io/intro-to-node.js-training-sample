# Routing and Templating
**Overview**
This module we introduce the concept of routing and templating. We’ll dive more into the use of routes to navigate users through the pages of a Node app. We’ll look into features like Express, Routes, Controller function and Views. We’ll also exemplify the Node.Js templating concepts.

## Section 1: Express

Express is a fast, unopinionated, minimalist web framework for [Node.js](https://nodejs.org/en/). It is through the Express object that we can access the router. Add the express package to your project by running:

```bash
$ npm install express
```

Then it’ll be available in your node modules folder. Add it to your project script with:

```bash
const express = require('express');
```

Then from the express object, we can pull out the router:

```bash
const router = express.Router();
```

Finally we create an instance of the express object `app` like this:

```bash
const app = express();
```

## Section 2: Routing

Routing refers to how an application’s endpoints (URIs) respond to client requests. When users hit a particular route (endpoint), you want something to happen, like update add to a database, modify an existing data, redirect to a new page and so on. Routing helps you achieve all that through its inbuilt routing methods.

**Route Methods**
Route methods specify a callback function (sometimes called “handler or controller functions”). These functions are called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application “listens” for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function. the callback functions take in two major parameters (`req` and `res`) to define the request and response respectively: 

```javascript
    app.get('/', (req, res)=>  {
      //.. do something
    })
```

On special cases, it takes a third parameter `next` to pass control to the next handler. These method are often `GET` (to handle get requests) and `POST` (to handle post requests).

```javascript
    app.get('/', (req, res, next)=> {
      //... do something
      next() // pass control to the next handler
    })
```

**Task 1: Make a get request**
In this task, you will make a simple get request to a defined route `(``'``/``'``)` and get a response with an output when the defined endpoint is reached.

**GET**
To make a simple get request and get a response, first we require the express package that was installed earlier. Then, we create an instance named `app` by invoking Express. Now open your project `index.js` file, delete all existing codes and update it with this code:

```javascript    
     const express = require('express')
     const app = express()
     
     app.get('/', (req, res)=> {
       res.send('Hello World!')
     })
     // name route path, defines another endpoint '/name'
     app.get('/name', (req, res)=> {
        res.send('Hello Name!')
      })
     app.listen(8080, function () {
       console.log('listening on port 3030!')
     })
```

Here, we have defined two routes( `/` , and `/name` ). The `app.get('/'...` means we are specifically focusing on the root URL (`/`). Hence, if we visit the root URL*(localhost:8080 or 127.0.0.1:8080)*, Express will respond with “Hello World!”. We will see more about route paths later as we proceed.

The `app.listen(...` shows we are creating a server that is listening on port 8080 for connections.

At this point, we can test our server to ensure that everything works, go back to the terminal and run:

```bash
$ node index
```

Navigate your browser to `127.0.0.1:8080` and you should now get this response:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_2ABC8045304430045298777D969D20810F9B96E994E0F726D24EF6DDFD7BBFC0_1525686454122_croppedRootRoute.jpg)


On the `127.0.0.1:8080/name` route, you should now get this:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_2ABC8045304430045298777D969D20810F9B96E994E0F726D24EF6DDFD7BBFC0_1525686460451_croppedNameROute.jpg)


**POST**
Just like the GET method, we use the POST method to send data to a defined route. The post method works the same way as the get method however while the get method gets data, the post method posts data to the defined route.

```javascript
    const express = require('express')
     const app = express()
     
     app.post('/', function (req, res) {
       res.send('Hello World!')// posting "Hello World!" to root URL
     })
     app.listen(8080, function () {
       console.log('listening on port 3030!')
     })
```

**More Info : Other methods**
Express supports other methods that correspond to all HTTP request methods: `put`, `delete`, `update` and so on. See a full list [here](https://expressjs.com/en/4x/api.html#app.METHOD) 

There is a special routing method, `app.all()`, used to load middleware functions at a path for **all** HTTP request methods. For example, the following handler is executed for requests to the route `/api` whether using GET, POST, PUT, DELETE, or any other HTTP request method supported in the [http module](https://nodejs.org/api/http.html#http_http_methods):

```javascript
    app.all('/secret', function (req, res, next) {
      console.log('Accessing the api section ...')
      next() // pass control to the next handler
    })
```

**Route paths**
Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions. For simplicity we often just keep it as strings.

Here are some examples of route paths based on strings. This route path will match requests to the root route, `/`:

```javascript
    //this route path will match requests to /.
    
    app.get('/', (req, res)=> {
      res.send('root')
    })
    
    //This route path will match requests to /about.
    
    app.get('/about', (req, res)=> {
      res.send('about')
    })
```

**Route Parameters**
Route parameters are named URL segments that are used to capture the values specified at their position in the URL. To define routes with route parameters, simply specify the route parameters in the path of the route as shown below:

```javascript
    app.get('/clients/:clientId/projects/:projectId',(req, res) =>{
      res.send(req.params)
    })
```

The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.

```
    Route path: /clients/:clientId/projects/:projectId
    Request URL: http://localhost:8080/clients/15/projects/8080
    req.params: { "clientId": "15", "projectId": "8989" }
```


## Section 3: Controller functions

You can provide multiple callback functions that behave like [middleware](https://expressjs.com/en/guide/using-middleware.html) to handle requests. The only exception is that these callbacks might invoke `next('route')` to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there’s no reason to proceed with the current route.

Route handlers can be in the form of a function, an array of functions, or combinations of both. For this exercise we’ll keep it simple and exemplify the handlers just in the form of functions as show below:

```javascript
    app.get('/example/a', (req, res)=> {
      res.send('this controller function handles route /a')
    })
```

Here, we are using a single callback function to handle the `/example/a` route.

Alternatively, we can use more than one callback function to handle the same route with the `next` object parameter. For example:

```javascript
    app.get('/example/b', (req, res, next) => {
      console.log('the response will be sent by the next function ...')
      next()
    }, (req, res) =>{
      res.send('this controller function handles route /b')
    })
```


## Section 4: Views

Views are simply the templates used by controllers to render data to the users. Instead of responding with text when someone visits our root route, we’d like to respond with an HTML file. And the way we can do this is by using what we call templates. 

Templates are predefined ways of rendering html contents to users in Node applications. In general, they allow us to interact with variables and then dynamically create our HTML based on those variables. There a number of Node templates that works great, a few of the popular ones are:
[Pug](https://pugjs.org/)
[Mustache](https://github.com/janl/mustache.js/)
[Ejs](https://www.npmjs.com/package/ejs). 
They all work great and the choice of use is typically personal.

**Task 2: Get contents on screen with a template**
For this task we’ll be using ejs. EJS is a templating language like the rest and to use it with express, we have to first set up the view engine.

*A* ***template engine*** *enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page in Node.js applications.*

First lets install it in the terminal. Back in the terminal inside the project folder, run:

```bash
$ npm install ejs --save
```

Now that we’ve installed the pacakage, we can access it inside our index.js file like so:

```javascript
    //below the require statements add :
    app.set('view engine', 'ejs')
```
    

EJS is accessed by default in the `views` directory. Currently we don’t have it so create a new folder named `views` in your project directory. Within that `views` folder, create a file named `index.ejs` and set it up like so:

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
            <form action="/" method="post">
              <input name="city" type="text" class="ghost-input" placeholder="Enter a text" required>
              <input type="submit" class="ghost-button" value="Click to send">
            </form>
          </fieldset>
        </div>
      </body>
    </html>
```

For now you can see `ejs` as typical `HTML`. In this file we have a form with an input and a button  that says “**Click to send**”. The idea is that when we render this file, form will appear on screen.

To render this template when the root route is reached, we need to go back to our `index.js` file and update the controller functions like this:

```ejs
     const express = require('express')
     const app = express()
     // setup the view engine
     + app.set('view engine', 'ejs')
     
     app.get('/', (req, res)=> {
     -  res.send('Hello World!')
       //render the ejs file
       res.render('index')
     }) 
     app.listen(8080, function () {
       console.log('listening on port 3030!')
     })
```

Here we simply added a line of code to define the view engine we’ll be using which in our case is `ejs`. We then used the `render()` method to display the `index.ejs` template we defined.

Now if you go back to the terminal and run :

```bash
$ node index
```

You’ll get this output:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_2ABC8045304430045298777D969D20810F9B96E994E0F726D24EF6DDFD7BBFC0_1525700330618_template.jpg)

## Summary

In this exercise we went over the concepts of routing and templating. With the tasks, you have also utilized the routing methods and paths to create a single route and made a get request to it. Finally you have also used the `ejs` view template to render HTML contents on screen.

