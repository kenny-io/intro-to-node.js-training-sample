# Intro to Node.js

## **Module 1: Setup and Basics**

**Overview**
In this section you will learn how to setup your environment for optimal Node development. You will install and configure a few tools as well as run a simple Node.js example to test everything out.

**Time Estimate**
20 minutes

**Section 1: Setup**

Task 1: Install Node.js


1. Inside your Virtual Machine open the terminal by clicking the **desktop menu**, **System Tools**, and then click **LXTerminal**.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619400788_installNode1.png)



2. Next, enter the follow commands in the terminal. Press enter after each command.

```bash    
sudo apt-get install curl
    
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    
sudo apt-get install -y nodejs
```


1. After the installation has completed enter the following command in the terminal and you should see a version print with something like `v8.9.x`.

```
node -v
```


![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619491064_node-version.png)


At this point, you have Node installed on your machine. Now lets proceed with running a Node example.

**Task 2: Install Google Chrome**
Our Virtual Machine comes with Firefox, but Google Chrome has some special capabilities for debugging Node.js applications. As such, this is the preferred browser for use in this lab.

1. Open Firefox by clicking the **desktop menu**, **Internet**, and then click **Firefox**.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619591899_installChrome.png)


2. Type in the address `google.com/chrome`.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619661889_chrome-download1.png)

3. Click the **Download Chrome** button.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619679161_chrome-download2.png)

4. Make sure the box for **64 bit .deb (For Debian/Ubuntu)** is selected and click **Accept and Install**.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619711498_chrome-download3.png)

5. When prompted be sure to change the option to **Save File** and click **Okay**.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619732972_chrome-download4.png)

6. Close Firefox and switch back to the terminal. Run the following three commands to install Google Chrome.
   
```bash
sudo apt-get install fonts-liberation
    
sudo dpkg -i ~/Downloads/google-chrome-stable_current_amd64.deb
```

![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619746448_chrome-install.png)

7. Open Chrome by clicking **desktop menu**, **Internet**, and then click **Google Chrome**. If promoted click to make Chrome the default browser.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619775714_open-chrome.png)


**Section 2: Visual Studio Code and Prettier Extension**
Prettier enables you to automatically format your Javascript code in a simple and clean manner. After you have been developing for some time you may prefer another way of formatting your code, but by using prettier you will ensure your code looks the same as the code in this lab.

1. Launch VS Code. Click the **desktop menu**, **Accessories**, then **Visual Studio Code**:
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619783074_vscode-open.png)

2. Open the VS Code Quick Open editor by running the following command

```
CTRL + P
```

3. Type in the following command in the editor and press enter:

```bash
    ext install prettier-vscode
```

4. VS Code will open the a list of matching extensions. Click the **Install** button on **Prettier - Code formatter**:
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619815728_prettier-download1.png)

5. After installation, you need to reload VS Code by clicking the **Reload** button to activate the extension you installed:
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619822283_prettier-download2.png)


Section 3: Node Modules

To better understand Node modules, consider them to be the same as JavaScript libraries. A set of functions you want to include in your application. This modules allows us do some specific things through their inbuilt functions and methods.

For example the Node HTTP module allows us create http connections for our Node applications. we can use its inbuilt `createServer` function to create servers to help us run our Node applications over http connections.

Adding a Node module to your project:
To add a module, we use first install it as a package and require it in our application script. To install the HTTP module first go back to the terminal and run:

```bash
    npm install http --save
```

This adds the http module into your `package.json` file and also into your `node-modules` folder. Next we add it to the application script using the `require` keyword:

```javascript
var http = require ('http');
```

We'll dive into more details about it when we run a node example later on in this course module.

**Section 4: Running a Node example**
In this section you will learn how to use NPM to install a Node package and reference it from your app.

1. Open the terminal and make a new directory for your code projects. Then create a folder in the code project for your first code exercise:

```bash
    # Create code projects folder
    cd ~
    mkdir code-projects
    
    # Create first code project folder
    cd code-projects
    mkdir myutility
    cd myutility/
```

[**More Info: Code Comments**](https://github.com/christiannwamba/intro-to-js-training-sample/blob/master/lab/exercise-02.md#moreinfo1)
The lines that start with `#` are comments and can be omitted. They are just there to provide additional information.


1. Now you will turn this empty folder into a Node.js application by creating a `package.json` file. In the terminal enter the following command:

```bash
    npm init
```

2. Just type enter to accept the defaults on all the options and your `package.json` file will be created.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619860961_npminit.png)

3. Next, open the project in VS Code by typing `code .` in the terminal.
4. Open the `package.json` file in VS Code to see the file that was just created for you.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525619889187_open-packagejson.png)


[**More Info: project.json**](https://github.com/christiannwamba/intro-to-js-training-sample/blob/master/lab/exercise-02.md#moreinfo2)
You can think of the `project.json` file as the master manifest of your application. It defines both the properties of your application as well as the dependencies, scripts, and other configuration you will use while building and running your application. You will see more of this as this lab progresses.

1. Return to the terminal and run the following command.

```bash
npm install chalk --save
```

![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525620020686_install-chalk.png)


[**More Info: project.json**](https://github.com/christiannwamba/intro-to-js-training-sample/blob/master/lab/exercise-02.md#moreinfo3)
Installing the chalk package in your application will result in a few things. First, an entry for chalk will be added to the package.json file. Second, a node_modules folder and a package-lock.json file will be added to your project. The node_modules folder is where the source of the packages you install will be placed. The package-lock.json file contains more detailed information on the specific versions of packages that are installed in your app.

1. Return to VS Code and create a new file by **left clicking** in the navigator area of VS Code and clicking **New File**
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525620051837_newfile.png)

2. Name the file `index.js`.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525620059655_namefile.png)

3. Paste the following code into that file and save it.

```bash
const chalk = require("chalk");
    
    console.log(chalk.green("Hello world!"));
    console.log(chalk.yellow("Welcome to Javascript Development."));
```

4. Switch to the terminal and type `node index.js`. After you click enter you should see the following output.
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525620101787_hellooutput.png)

5. You can see how prettier formats your code by messing up the indentation as shown below:
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525620106500_prettier-indent1.png)

6. Now press `CTRL + SHIFT + I` to fix up the mess with prettier:
![](https://d2mxuefqeaa7sj.cloudfront.net/s_1570DA20F9C9FD2F15B8805B5DF78BF6EAE65EDD8C1AB7B8A715AB5C25919BE0_1525620111168_prettier-indent2.png)


You have successfully installed and ran a Node example. Am sure you would like to run your example on a browser and not just in the logs. To do this will require a little bit more work so lets get right to it.

First, to get your Node example running on a webpage or simply on the browser, you'll need the Node HTTP module. The http module is included in Node.js to make it easy for us to create Node.js applications. We'll get into modules later on in this course but for now, lets just use it here.

Add the HTTP module to your project, go back to your terminal and run:

```bash
    npm install http --save
```

This will add the http module to our project. Now lets use it to create a HTTP connection to run our Node example. Open the `index.js` file and update it with this code:

```javascript
    var http = require('http');
    
    http.createServer(function (request, response) {
        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.end('Hello World\n');
    }).listen(8080);
    
    console.log('Server started');
```

Now save your file and again run it with:

```bash
node index.js
```

You should see 'Server started' in the terminal. Great! Now open your web browser and go to 'http://localhost:8080' you should see your 'Hello World' message.

**Summary**
In this exercise you setup your basic Node development environment and installed some basic developement tools like VSCode and Chrome. You used npm to initialize an application and install a package. Finally, you wrote a simple CLI script and ran that script with Node.

