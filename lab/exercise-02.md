# Core concepts

## **Overview**

This module will introduce the core concepts of NodeJs. We’ll provide a deeper understanding of how Node works behind the scenes. Touching on areas such as files, processes, the HTTP modules and the concepts of Promises and Async/Await in Node.

## Task 1: Node Filing System

Node has modules which are sort of libraries that add additional functions to our server. One of such modules is the file module. The file module helps you to work with the files on your computer. To use this module, you require it like this:

```bash
    const fs = require('fs');
```

After requiring the module, you can perform various functions like:

- Reading, 
- Writing
- Creating, 
- Updating, 
- Deleting and 
- Renaming files and so on. 

Let’s now see how we can perform these various functions.

**Reading** **Files**

In this task we’ll demonstrate how you can use the Node filing system to read a file on your computer. First lets create the file we want to read. On your desktop, create a text file named `Testfile.txt` and save content in it like so :

```
    //Testfile.txt
    This is test file to test fs module of Node.js
```
    

Now lets attempt to read this file with our Node.js fs module. Assume we have the following text file (located in the same folder as your Node.js project file), this code will read the content of `Testfile.txt` to the console:

```javascript
    var fs = require('fs');
    
    fs.readFile('TestFile.txt', function (err, data) {
        if (err) throw err;
    
        console.log(data);
    });
```

save this code in a file called `server.js`.

The above example reads `TestFile.txt` asynchronously and executes a callback function when read operation completes. This read operation either throws an error or completes successfully. The `err` parameter contains error information if any. The data parameter contains the content of the specified file. Then finally to ensure that we read the file correctly, we log it to the console. Now to test things out, navigate into the Node `server.js` directory and run : 

```bash
    // create a default package.json file
    $npm init -y
    // run the read file code
    $ node server
    // console output
    /*This is test file to test fs module of Node.js
```


> assuming you have saved your Testfile.txt on the same directory as server.js.

If the whole default set up process is not very clear at this point, do not worry. We will set it up from scratch on the next exercise when we look at the concepts of Routing and Templating.
Also this is exactly the same way we read other file formats like HTML. Alternatively you can synchronously read the same `Testfile.txt` with :

```bash
    var fs = require('fs');
    
    var data = fs.readFileSync('Testfile.txt', 'utf8');
    console.log(data); 
```

But we’ll pay more attention to working asynchronously in this rest of the exercise.

**Writing files**

In this task we’ll look at how we can write to a file. The Node filing system also provides us a method that helps with that. We use the `fs.writeFile()` method to write data to a file. If file already exists then it overwrites the existing content otherwise it creates a new file and writes data into it:

```javascript
    var fs = require('fs');
    
    fs.writeFile('test.txt', 'Hello World!', function (err) { 
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
```

The example above creates a new file called `test.txt` and writes "Hello World" into it asynchronously. 

**Updating existing files**

In the same way, use `fs.appendFile()` method to append the content to an existing file :

```javascript
    var fs = require('fs');
    
    fs.appendFile('test.txt', 'Hello World!', function (err) { 
        if (err)
            console.log(err);
        else
            console.log('Append operation complete.');
    });
```

**Creating new files**

To create a new a file, we call the `.o``pe``n()` method on the file module variable:

```javascript
    var fs = require('fs');
    fs.open('newfile.txt', 'Introduction to NodeJS. ', function (err) {
      if (err) throw err;
    });
```

If you run the server, this snippet creates a new text file called `newfile.txt` and populates it with a text 'Introduction to NodeJS'. If you open your project folder, it should look like the image below. If you’ve not set up a project folder a yet, check the first task again, however we’ll still guide you on how to do so in the next exercise.


![](https://d2mxuefqeaa7sj.cloudfront.net/s_C19EEAFA3901E5A0F30A1B92D70D39891BF1092DD2605B34396CA11A41695EE9_1525682016347_1.png)



**Delete an existing file**

We use the `fs.unlink()` method to delete an existing file like this:

```javascript
    var fs = require('fs');
    
    fs.unlink('newFile.txt', function () {
        
        console.log('write operation complete.');
    
    });
```

This will simply delete the `newfile.txt` file we created on the third task above.

**Rename existing file**

To rename an existing file, we us the `fs.rename()` method:

```javascript
    var fs = require('fs');
    
    fs.rename('test.txt', 'myrenamedfile.txt', function (err) {
      if (err) throw err;
      console.log('File Renamed!');
    });
```

This will simply rename our `test.txt` file to `renamedfile.txt`.


## Task 2: Processes

This task will demonstrate how to leverage on the Node process object to build
better Node applications. We’ll look at the associating process events and methods
to provide better context on how to communicate between Node.js proccesses.

**Why create child processes in NodeJS**

When running an application in NodeJS, it’s single threaded, and will only utilise a single core. When performing **great number of** tasks (cpu-intensive), you may see this impacting performance, and see runtime/respond-time increase.

![](https://cdn-images-1.medium.com/max/1200/1*8hEn7BZ2xhHkDmm6nghP2g.png)


If your NodeJS Application has 100% cpu-usage and is taking a long time to complete or respond, this can be improved by dividing the work to be done, and spreading it over multiple processes.

![](https://cdn-images-1.medium.com/max/1600/1*pioKSP13t8uOXeIYPQnQcw.png)


Managing these processes and communicating between them can be a little daunting at first. But it can be easy to implement, especially if your code is async already.

**Creating NodeJS child processes**

NodeJS provides a package called `child_process` with utilities for spawning processes. If you want to a new process running a NodeJS script you’ll want to use `fork`. Fork can only spawn a new NodeJS processes. Then you give it a javascript file to execute:

```javascript
    const fork = require('child_process').fork;
    const program = path.resolve('other.js');
    const child = fork(program);
```

By default the child console/output will be inherited from the parent.
Which means you will see all the output in the terminal from both the parent and child processes.

**Run a child_process silently**

A simple way to just create a silent child process is to pass a options object and set the `silent` property:

```javascript
    const fork = require('child_process').fork;
    const program = path.resolve('other.js');
    const child = fork(program, [], {
      silent: true;
    });
```
    

**Communicate to a child_process**

To communicate with the child process we need to enable `ipc` — inter process communication. To do this we need to add list of input/output options:

```javascript
    const fork = require('child_process').fork;
    const program = path.resolve('program.js');
    const parameters = [];
    const options = {
      stdio : ['pipe', 'pipe', 'pipe', 'pipe',] 
    }
    const child = fork(program, parameters, options);
```

This will enable us use `process.send()` and `process.on('message')` in the child process. Then, we can use it to communicate between two processes like this:

**child**

```javascript
    if(process.send){
      process.send('Hello');
    }
    process.on('message', message=>{
      console.log('message from parent:', message);
    }
```

**parent**

we’ll simply just take our code on communicating to a child process and update it like so:

```javascript
    const fork = require('child_process').fork;
    const program = path.resolve('program.js');
    const parameters = [];
    const options = {
      stdio : ['pipe', 'pipe', 'pipe', 'pipe',] 
    }
    const child = fork(program, parameters, options);
    child.on('message', message=>{
      console.log('message from child:', message);
      child.send('Hello Parent');
    }
```

**Communicate to unrelated an process**

Similarly we can establish communication between two unrelated Node proccesses. Take for instance we have two independent NodeJS processes running and want them to communicate, we can do this using a npm package: `[node-ipc](https://www.npmjs.com/package/node-ipc)`. Hence, you have to npm install it just like every other module. Now lets create two unrelated processes and communicate:

**process_01**

```javascript
    const ipc = require('node-ipc');
    ipc.config.id = 'unique_process_name_01';
    ipc.config.retry = 1500;
    ipc.config.silent = true;
    ipc.server(() => ipc.server.on('unique_message_name', message =>{
      console.log(message);
    }
    ipc.server.start();
```

**process_02**

```javascript
    const ipc = require('node-ipc');
    ipc.config.id = 'unique_process_name_01';
    ipc.config.retry = 1500;
    ipc.config.silent = true;
    ipc.connectTo('unique_process_name_01', ()=>{
      ipc.of['jest.observer'].on('connect', ()=>{
        ipc.of['jest.observer'].emit('unique_message_name', "type_your_message')
      });
    });
```

**process_01** should now start the pub-sub server, which other processes can then connect to and communicate.

There other utilities like **spawn** that is provided from `child_process`. It can be used to create a process from any command. `child_process` can also be used for **clustering**; running multiple instances of the same program and balancing a large workload over these processes.


## Task 3: HTTP

As earlier mentioned, Node has modules which provide extra functionalities. In this task, we will look at the HTTP module. This is one of the inbuilt modules and that helps Node servers to transfer data over the `Hyper Text Transfer Protocol`. This module servers as a  server and a client - meaning, you can use it to create a server endpoint and you can use it to make client requests to other servers. 

To include the HTTP module, npm install it on your project and use the `require()` method:

```javascript
    var http =  require('http');
```

Thats it. From this point you can use the `http` variable to create your server and handle requests etc.

**Create server**

The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
Use the `createServer()` method to create an HTTP server:

```javascript
    var http = require('http');
    
    //create a server object:
    http.createServer(function (req, res) {
      res.write('Hello World!'); //write a response to the client
      res.end(); //end the response
    }).listen(8080); //the server object listens on port 8080
```

The function passed into the `http.createServer()` method, will be executed when someone tries to access the computer on port 8080.

**HTTP Headers**

HTTP headers allow the client and the server to pass additional information with the request or the response. They are a core part of HTTP requests and responses as they carry information about the client browser, the requested page, the server and more.

![](https://cdn.tutsplus.com/net/uploads/legacy/511_http/http_diagram.png)


Previously we set up a server listeneing on port 8080, lets say we want to specify that we want the response to be displayed as HTML. We can simply include an HTTP header with the correct content type like so:

```javascript
    var http = require('http');
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('Hello World!');
      res.end();
    }).listen(8080);
```

The first argument of the `res.writeHead()` method is the status code, 200 which means that all is OK, the second argument is an object containing the response headers.
Here we have just specified the type of content we want to get from the server by adding an HTTP header `Content-Type` with a value of `text/html`. 

There are a lot more other HTTP headers like :

- Expect - The `**Expect**` HTTP request header indicates expectations that need to be fulfilled by the server in order to properly handle the request.
- Date - The `**Date**` general HTTP header contains the date and time at which the message was originated.
- Allow - The `**Allow**` header lists the set of methods support by a resource.
- Age - The `**Age**` header contains the time in seconds the object has been in a proxy cache.

You will come across a lot of them in time however we can’t cover them all just here.

**Read HTTP Query String**

The function we passed into the `http.createServer()` has a `req` argument that represents the request from the client, as an object. This object has a property called `url` which holds the part of the url that comes after the domain name. We can use this property to read the request we are sending to the server or the endpoint that comes after our domain name :

```javascript
    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(req.url);
        res.end();
    }).listen(8080);
```

If you save the file and run the server, you should see different results when open different routes like if you navigate to `http://localhost:8080/rain` you will get `/rain` printed on the screen. If you change the route to `http://localhost:8080/wind` you will in turn get `/wind` printed.

**HTTP Classes**
The HTTP module has accompanying Classes that comes with individual event handlers. These Classes provides the major components we use in this module. Like we have already seen while creating our server, the `server.listen()` method is an in-built handler from the `http.CreateServer` Class.

The Http module has other Classes like:
http.ClientRequest
http.ServerResponse
http.Agent
http.METHODS etc.
Each class is responsible for managing specific parts of the entire Http module. Within the classes there are other methods, functions, handlers etc. We’ll see more practical use cases for these classes as we progress in the course.

## Task 4: Promises and Async/Await

Promises in JavaScript represent another module which helps us to write asynchronous codes. This task will explain the core concepts of Node.Js promises and async/await functions.
We’ll use code examples to demonstrate how we can utilize its capabilities to handle async operations and callbacks.

**Promise**

In simple words “A promise is a word taken for some action, the other party who gave the promise might fulfill it or deny it”. In the case of fulfilling, the promise gets resolved, and in another case, it gets rejected.

We can create a promise in Node.js and use it as an upcoming fact to describe few actions. Promises are kind of design patterns to remove the usage of unintuitive callbacks.

![](https://cdn-images-1.medium.com/max/800/1*i9kf_lixMpFftw5rf9m7pw.png)


As the picture depicts, these are the steps for creating and using promises:


- A promise can be created in our JavaScript code. Or else it can be returned from an external node package
- Any promise that performs async operations should call any one of the two methods **resolve** or **reject.** The ****code logic should take care of when and where to call these functions. If the operation is successful, pass that data to the code that uses that promise, otherwise pass error
- The code which uses a promise should call **then** function on that promise. It takes two anonymous functions as parameters. The first function executes if the promise is resolved and the second function executes if promise is rejected.

What happens if you try to access the value from promise before it is resolved or rejected. Then promise will be in the **pending** state.

**Implementing Promises in Node.js**

We can create a promise in Node.js using the **new** constructor:

```javascript
    var myPromise = new Promise(function(resolve, reject){
       ....
    })
```

So `myPromise` is a Promise type object which allows us to use it for later.
To better understand how Promises work, lets write a simple Promise that gets a single user from an array of users: 

```javascript
    function getFirstUser() {
        return getUsers().then(function(users) {
            return users[0].name;
        }).catch(function(err) {
            return {
              name: 'default user'
            };
        });
    }
```

Here we are accessing the data in our Promise using the `.then()` method. We have also simply handled. Promises also allow us use the `.catch()` method to handle any occurrences of errors in our functions.

**Async/Await**

Inside a function marked as async, you are allowed to place the `await` keyword in front of an expression that returns a Promise. When you do, the execution is paused until the Promise is resolved.

Before we dive into it, let’s take a moment to familiarize you with the `async/await` style. First, `a``sync/``a``wait` makes asynchronous code appear and behave like synchronous code. Being that it was built on top of Promises, you could simply see it as a new way of writing synchronous code. Just like `Promises` themselves, `a``sync/``a``wait` is equally non-blocking. 

The purpose of `async/await` functions is to simplify the behavior of using promises synchronously and to perform some behavior on a group of `Promises`. Just as `Promises` are similar to structured callbacks, one can say that `async/await` is similar to combining [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators) and promises.
Basically there are two keywords involved, `async` and `await`, let’s understand them better:

**Async**

Putting the keyword `async` before a function tells the function to return a `P``romise`. If the code returns something that is not a ```Promise```, then JavaScript automatically wraps it into a resolved promise with that value e.g when it returns an `A``syncFunction` object:

```javascript
    async function oddNumber() {
      return 7;
    }
```

Then it’ll return a resolved `P``romise` with the result of `7`, however we can set it to explicitly return a `P``romise` like this:

```javascript
    async function evenNumber() {
      return Promise.resolve(8);
    }
```

Then there’s the second keyword `await` that makes the function even much better.

**Await**

The `await` keyword simply makes JavaScript wait until that `P``romise` settles and then returns its result:

```javascript    
    let result = await promise;
```
    

Note that the `await` keyword only works inside async functions, otherwise you would get a `SyntaxError`. To bring everything together, lets rewrite the Promise function we wrote before with asyn/await:

```javascript
    async function getFirstUser() {
        try {
            let users = await getUsers();
            return users[0].name;
        } catch (err) {
            return {
                name: 'default user'
            };
        }
    }
```

**Any noticeable difference?**

In Promises we handle callbacks with the `.then()` method while in async/await, we simply use the `await()` method.
Also there’s a noticeable difference in the way they handle errors. As we cleared out before, Promises use the `.catch()` method to handle callback any possible errors while async/await uses `try/catch`.


## Summary

In this exercise, we have looked through the Node filing system where we demonstrated how to perform file creation,deletion operation in Node. We also explained how to leverage on the Node process object to build better Node applications. We went further to demonstrate how to create servers and make requests with the Node HTTP module and finally we explained the concepts of using Promises and Async/Await.

