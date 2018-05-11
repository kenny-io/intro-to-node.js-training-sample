# Deploying a Node app
**Overview**
Once your site is finished, you're going to need to host it somewhere more public and accessible than your personal development computer. Up to now you've been working in a [development environment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment), using Express/Node as a web server to share your site to the local browser/network.

Hence you’ve been running your website with (insecure) development settings that expose debugging and other private information. Before you can host a website externally, you’re going to properly satisfy this:

- Choose an environment for hosting the Node app.
- Make a few changes to your project settings to increase security.
- Set up a production-level infrastructure for serving your website.

This exercise provides some guidance on your options for choosing a hosting site, a brief overview of what you need to do in order to get your Node app ready for production, and a practical example of how to install the Node app onto the [Heroku](https://www.heroku.com/) cloud hosting service.


## Task 1: Production environment

Before we go further,lets understand what is “production environment”. This task will provide a basic knowledge of production environments and the components that comes together to make one. 

The production environment is the environment provided by the server computer where you will run your website for external consumption. The environment includes:


- Computer hardware on which the website runs.
- Operating system (e.g. Linux or Windows).
- Programming language runtime and framework libraries on top of which your website is written.
- Web server infrastructure, possibly incuding a web server, reverse proxy, load balancer, etc.
- Databases on which your website is dependent.

The server computer could be located on your premises and connected to the Internet by a fast link, but it is far more common to use a computer that is hosted "in the cloud". 

What this actually means is that your code is run on some remote computer (or possibly a "virtual" computer) in your hosting company's data center(s). The remote server will usually offer some guaranteed level of computing resources (e.g. CPU, RAM, storage memory, etc.) and Internet connectivity for a certain price.


## Task 2: Choosing a hosting Provider

There are numerous hosting providers that are known to either actively support or work well with *Node* (and *Express*). These vendors provide different types of environments (IaaS, PaaS), and different levels of computing and network resources at different prices. In this task we will cover all the major considerations you should cover to guide you while making the choice of a hosting provider.

**Hosting considerations**

Some of the things to consider when choosing a host:

- How busy your site is likely to be and the cost of data and computing resources required to meet that demand.
- Level of support for scaling horizontally (adding more machines) and vertically (upgrading to more powerful machines) and the costs of doing so.
- Where the supplier has data centres, and hence where access is likely to be fastest.
- The host's historical uptime and downtime performance.
- Tools provided for managing the site — are they easy to use and are they secure (e.g. SFTP vs FTP).
- Inbuilt frameworks for monitoring your server.
- Known limitations. Some hosts will deliberately block certain services (e.g. email). Others offer only a certain number of hours of "live time" in some price tiers, or only offer a small amount of storage.
- Additional benefits. Some providers will offer free domain names and support for SSL certificates that you would otherwise have to pay for.
- Whether the "free" tier you're relying on expires over time, and whether the cost of migrating to a more expensive tier means you would have been better off using some other service in the first place!

The good news when you're starting out is that there are quite a few sites that provide computing environments for "free", albeit with some conditions. For example, [Heroku](https://www.heroku.com/) provides a free but resource-limited *PaaS* environment "forever", while [Amazon Web Services](http://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-free-tier.html), [Microsoft Azure](https://azure.microsoft.com/en-us/pricing/details/app-service/), and the open source option [PWS/Cloud Foundry](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Installing_on_PWS_Cloud_Foundry) provide free credit when you first join.

Many providers also have a "basic" tier that provides more useful levels of computing power and fewer limitations. [Digital Ocean](https://www.digitalocean.com/) is an example of a popular hosting provider that offers a relatively inexpensive basic computing tier (in the $5 per month lower range at time of writing).

Now that you have probably decided appropriately oh the hosting service to use following the cosiderations you’ve made, lets now get our website ready for publishing.


## Task 3: Getting website ready for production

The main things to think about when publishing your website are web security and performance. At the bare minimum, you will want to remove the stack traces that are included on error pages during development, tidy up your logging, and set the appropriate headers to avoid many common security threats.

In the following sub-tasks we’ll outline the most important changes that you should make to your app to get it ready for deployment.

**Set Node_ENV to “Production”**

We can remove stack traces in error pages by setting the `NODE_ENV` environment variable to *production* (it is set to '*development*' by default). 

In addition to generating less-verbose error messages, setting the variable to *production* caches view templates and CSS files generated from CSS extensions. Tests indicate that setting `NODE_ENV` to *production* can improve app performance by a factor of three!. What this means is that if you open the `variables.env` file on your project, it’ll look like this: 


![](https://d2mxuefqeaa7sj.cloudfront.net/s_0C17205623AFE1E21F1C78DEFDA8BEBF6965D1A00D02CD9F3B8E483B6532F1B5_1526025934833_ENV.jpg)


Then change the value of `NODE_ENV` to “production” not “developement” anymore since we are deploying our app.


>  This is actually a change you make in your environment setup rather than your app, but important enough to note here! We'll show how this is set for our hosting example below.

**Log appropriately**

Logging calls can have an impact on a high-traffic websites. In a production environment you may need to log website activity (e.g. tracking traffic or logging API calls) but you should attempt to minimise the amount of logging added for debugging purposes.

One way to minimise "debug" logging in production is to use a module like [debug](https://www.npmjs.com/package/debug) that allows you to control what logging is performed by setting an environment variable for it. For example, let’s consider this code below that shows you how you might  set up "user" logging:

```javascript
    var debug = require('debug')('user');
    
    // Display Author update form on GET
    exports.user_update_get = function(req, res, next) {   
        
        req.sanitize('id').escape().trim();
        User.findById(req.params.id, function(err, user) {
            if (err) {
                debug('update error:' + err);
                return next(err);
            }
            //On success
            res.render('user_form', { title: 'Update User', user: user});
        });
    };
```

The debug variable is declared with the name 'user', and the prefix "user" will be automatically displayed for all logs from this object.
You can then enable a particular set of logs by specifying them as a comma-separated list in the `DEBUG` environment variable. You can set the variables for displaying user as shown here:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_0C17205623AFE1E21F1C78DEFDA8BEBF6965D1A00D02CD9F3B8E483B6532F1B5_1526026856764_DEBUG.jpg)


Note: Calls to `debug` can replace other logging you might previously have done using `console.log()` or `console.error()`. Replace any `console.log()` calls in your code with logging via the [debug](https://www.npmjs.com/package/debug) module like we have just done for “user”.

Turn the logging on and off in your development environment by setting the DEBUG variable and observe the impact this has on logging.

**Use gzip/deflate compression for responses**

Web servers can often compress the HTTP response sent back to a client, significantly reducing the time taken to for the client to get and load the page. The compression method used will depend on what decompression methods the client says that it supports in the request (if no compression methods are supported the response will be sent uncompressed).

You can add this to your site using [compression](https://www.npmjs.com/package/compression) middleware. Install this to your project by running the following command at the root of the project.

```bash
    npm install compression
```

Open **./index.js** and require the compression library as shown:

```javascript
    var compression = require('compression');
```

Add the compression library to the middleware chain with the `use()` method (this should appear before any routes that you want compressed — in this case all of them!):


```javascript    
    //Import routes for "data" area of site
    var data = require('./routes/addData'); 
    var compression = require('compression');
    
    // Create the Express application object
    var app = express();
    
    ...
    
    app.use(compression()); //Compress all routes
    
    app.use(express.static(path.join(__dirname, 'public')));
    
    app.use('/', index);
    app.use('/addData', addData);
    app.use('/name', name); // Add "name" routes to middleware chain.
    
    ...
```



**Use Helmet to protect against well known web vulnerabilities**

[Helmet](https://www.npmjs.com/package/helmet) is a middleware package that can help protect your app from some well-known web vulnerabilities by setting appropriate HTTP headers like:

- setting Content Security Policy
- handling Certificate Transparency
- controls browser DNS prefetching
- disable client-side caching and so on

 
Install this to your project by running the following command at the root of the project:

```bash
    $ npm install helmet --save
```

Then add the module to your project middleware chain like:

```javascript
    var compression = require('compression');
    var helmet = require('helmet');
    
    // express application object
    var app = express();
    
    app.use(helmet());
    ...
```

It’s best to `use` Helmet early in your middleware stack so that its headers are sure to be set.


## Task 4: Deploying Node app on Heroku

This task provides a practical demonstration of how to install *our Node app* on the [Heroku PaaS cloud](http://heroku.com/). Heroku is one of the longest running and popular cloud-based PaaS services. It originally supported only Ruby apps, but now can be used to host apps from many programming environments, including Node (and hence Express)!

We are choosing to use Heroku for several reasons:

- Heroku has a [free tier](https://www.heroku.com/pricing) that is really free (albeit with some limitations).
- As a PaaS, Heroku takes care of a lot of the web infrastructure for us. This makes it much easier to get started, because you don't worry about servers, load balancers, reverse proxies, restarting your website on a crash, or any of the other web infrastructure that Heroku provides for us under the hood.
- While it does have some limitations, these will not affect this particular application. For example:
  - Heroku provides only short-lived storage so user-uploaded files cannot safely be stored on Heroku itself.
  - The free tier will sleep an inactive web app if there are no requests within a half hour period. The site may then take several seconds to respond when it is woken up.
  - The free tier limits the time that your site is running to a certain amount of hours every month (not including the time that the site is "asleep"). This is fine for a low use/demonstration site, but will not be suitable if 100% uptime is required.
  - Other limitations are listed in [Limits](https://devcenter.heroku.com/articles/limits) (Heroku docs).
- Mostly it just works, and if you end up loving it and want to upgrade, scaling your app is very easy.

While Heroku is perfect for hosting this demonstration it may not be perfect for your real website. Heroku makes things easy to set up and scale, at the cost of being less flexible, and potentially a lot more expensive once you get out of the free tier.

**How it works**

Before we deploy, fisrt its important that you understand the basic concepts of Heroku and exactly how things work. Heroku runs websites within one or more "[Dynos](https://devcenter.heroku.com/articles/dynos)", which are isolated, virtualized Unix containers that provide the environment required to run an application. 

The dynos are completely isolated and have an ephemeral file system (a short-lived file system that is cleaned/emptied every time the dyno restarts). The only thing that dynos share by default are application [configuration variables](https://devcenter.heroku.com/articles/config-vars). Heroku internally uses a load balancer to distribute web traffic to all "web" dynos. Since nothing is shared between them, Heroku can scale an app horizontally by adding more dynos (though of course you may also need to scale your database to accept additional connections).

Because the file system is ephemeral you can't install services required by your application directly (e.g. databases, queues, caching systems, storage, email services, etc). Instead Heroku web applications use backing services provided as independent "add-ons" by Heroku or 3rd parties. Once attached to your web application, the add-on services are accessed in your web application via environment variables.

In order to execute your application, Heroku needs to be able to set up the appropriate environment and dependencies, and also understand how it is launched. For Node apps all the information it needs is obtained from your **package.json** file.

Developers interact with Heroku using a special client app/terminal, which is much like a Unix bash script. This allows you to upload code that is stored in a git repository, inspect the running processes, see logs, set configuration variables, and much more.

In order to get our application to work on Heroku we'll need to put our Express web application into a git repository and make some minor changes to the package.json. Once we've done that we can set up a Heroku account, get the Heroku client, and use it to install our website.

That's all the overview you need in order to get started. Now lets do it!


## Task 5: Creating an application repository in Github

Heroku is closely integrated with the **git** source code version control system, using it to upload/synchronise any changes you make to the live system. It does this by adding a new Heroku "remote" repository named *heroku* pointing to a repository for your source on the Heroku cloud. During development you use git to store changes on your "master" repository. When you want to deploy your site, you sync your changes to the Heroku repository. In this task we’ll provide a basic walk through of how to set up a github account and create a repository to upload the projects files onto.


> **Note:** If you're used to following good software development practices you are probably already using git or some other SCM system. If you already have a git repository, then you can skip this step.

There are a lot of ways of to work with git, but one of the simplest is to first set up an account on [GitHub](https://github.com/), create the repository there, and then sync to it locally:


1. Visit [https://github.com/](https://github.com/) and create an account.
2. Once you are logged in, click the **+** link in the top toolbar and select **New repository**.
3. Fill in all the fields on this form. While these are not compulsory, they are strongly recommended.
  - Enter a new repository name (e.g. *node_training_sample*), and description (e.g. "This website is written in Express (Node)".
  - Choose **Node** in the *Add .gitignore* selection list.
  - Choose your preferred license in the *Add license* selection list.
  - Check **Initialize this repository with a README**.
4. Press **Create repository**.
5. Click the green "**Clone or download**" button on your new repo page.
6. Copy the URL value from the text field inside the dialog box that appears (it should be something like: https://github.com/*<your_git_user_id>*/*node_training_sample*.git.

Now that the repository ("repo") is created we are going to want to clone it on our local computer, here’s how:


1. Install *git* for your local computer (you can find versions for different platforms [here](https://git-scm.com/downloads)).
2. Open a command prompt/terminal and clone your repository using the URL you copied above, run:
    git clone https://github.com/<your_git_user_id>/node_training_sample.git
3. This will create the repository below the current point.
4. Navigate into the new repo.
    cd node_training_sample

The final step is to copy in your application and then add the files to your repo using git:

5. Copy your Node application into this folder `*node_training_sample*` (excluding **/node_modules**, which contains dependency files that you should fetch from NPM as needed).
6. Open a command prompt/terminal and use the `add` command to add all the project files from the folder to git.

```bash
    git add <file name> // adds the particular
    
    git add . // adds all files
```

3. Use the status command to check all files you added to the staging area are correct (you want to include source files, not binaries, temporary files etc.). It should look a bit like the listing below:
    > git status
    On branch master
    Your branch is up-to-date with 'origin/master'.
    Changes to be committed:
      (use "git reset HEAD <file>..." to unstage)
    
            new file:   ...
7. When you're satisfied with the added files, commit the files to your local repository with:
    git commit -m "Moving first version of application to github"
8. Then synchronise your local repository to the Github website, using the following:
    git push -u origin master

When this operation completes, you should be able to go back to the page on Github where you created your repo, refresh the page, and see that your whole application has now been uploaded. You can continue to update your repository as files change using this `add/commit/push` cycle.


## Task 6: Update the app for Heroku

This section explains the changes you'll need to make to our Node application to get it to work on Heroku.

**Set node version**
 
The **package.json** contains everything needed to work out your application dependencies and what file should be launched to start your site. Heroku detects the presence of this file, and will use it to provision your app environment.
The only useful information missing in our current **package.json** is the version of node. We can find the version of node we're using for development by entering the command:

```bash
    >node --version
    v8.9.1
```

Open **package.json**, and add this information as an **engines > node** section as shown (using the version number for your system):

```javascript
    {
      "name": "node_training_sample",
      "version": "0.0.0",
      "engines": {
        "node": "8.9.1"
      },
      "private": true,
      ...
```

**Database configuration**

So far in this tutorial we've used a single database that is hard coded into **app.js**. Normally we'd like to be able to have a different database for production and development, so next we'll modify the LocalLibrary website to get the database URI from the OS environment (if it has been defined), and otherwise use our development database.

Open **app.js** and find the line that sets the mongoDB connection variable. It will look something like this:

```javascript
    var mongoDB = 'mongodb://your_user_id:your_password@ds119748.mlab.com:19748/training_sample';
```

Replace the line with the following code that uses `process.env.MONGODB_URI` to get the connection string from an environment variable named `MONGODB_URI` if has been set (use your own database URL instead of the placeholder below):

```javascript
    var mongoDB = process.env.MONGODB_URI || 'mongodb://your_user_id:your_password@ds119748.mlab.com:19748/local_library';
```

**Get dependencies and re-test**

Before we proceed, let's test the site again and make sure it wasn't affected by any of our changes. 
First we will need to fetch our dependencies (you will recall we didn't copy the **node_modules** folder into our git tree). You can do this by running the following command in your terminal at the root of the project:

```bash
    npm install
```

Now run the site (see [Testing the routes](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes#Testing_the_routes) for the relevant commands) and check that the site still behaves as you expect.

**Save changes to Github**

Next let's save all our changes to Github. In the terminal (whilst inside our repository), enter the following commands:

```bash
    git add -A
    git commit -m "Added files and changes required for deployment to heroku"
    git push -u origin master
```

We should now be ready to start deploying our Node app on Heroku.


## Task 6: Deploy to Heroku

I this task we’ll demonstrate how to create an account on Heroku, Install the required required Heroku client to interface with our project and upload the website. We’ll also cover how you can set the configuration variables and manage addons on Heroku.

**Get a Heroku account**

To start using Heroku you will first need to create an account. Skip this section if you've already got an account and installed the Heroku client else, lets do it together:


- Go to [www.heroku.com](https://www.heroku.com/) and click the **SIGN UP FOR FREE** button.
- Enter your details and then press **CREATE FREE ACCOUNT**. You'll be asked to check your account for a sign-up email.
- Click the account activation link in the signup email. You'll be taken back to your account on the web browser.
- Enter your password and click **SET PASSWORD AND LOGIN**.
- You'll then be logged in and taken to the Heroku dashboard: [https://dashboard.heroku.com/apps](https://dashboard.heroku.com/apps).

**Install the client**

Download and install the Heroku client by following the [instructions on Heroku here](https://devcenter.heroku.com/articles/getting-started-with-python#set-up).
After the client is installed you will be able run commands. For example to get help on the client run:

```bash
    heroku help
```

**Create and upload the Project**

To create the app we run the "create" command in the root directory of our repository. This creates a git remote ("pointer to a remote repository") named *heroku* in our local git environment:

```bash
    heroku create
```

**Note:** You can name the remote if you like by specifying a value after "create". If you don't then you'll get a random name. The name is used in the default URL.
We can then push our app to the Heroku repository as shown below. This will upload the app, get all its dependencies, package it in a dyno, and start the site:

```bash
    git push heroku master
```

If we're lucky, the app is now "running" on the site. To open your browser and run the new website, use the command:

```heroku
    heroku open
```

**Note**: The site will be running using our development database. Create some books and other objects, and check out whether the site is behaving as you expect. In the next section we'll set it to use our new database.

**Setting configuration variables**

You will recall from a preceding section that we need to [set NODE_ENV to 'production'](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment#NODE_ENV) in order to improve our performance and generate less-verbose error messages. We do this by entering the following command:

```heroku
    >heroku config:set NODE_ENV='production'
    Setting NODE_ENV and restarting limitless-tor-18923... done, v13
    NODE_ENV: production
```

We should also use a separate database for production, setting its URI in the **MONGODB_URI**  environment variable. You can set up a new database and database-user exactly as we did before in the previous exercises and get its URI. You can set the URI as shown (obviously, using your own URI):

```heroku
    >heroku config:set MONGODB_URI='mongodb://your_user:your_password@ds139278.mlab.com:39278/local_library_production'
    Setting MONGODB_URI and restarting limitless-tor-18923... done, v13
    MONGODB_URI: mongodb://your_user:your_password@ds139278.mlab.com:39278/local_library_production
```

You can inspect your configuration variables at any time using the `heroku config`command — try this now:

```heroku
    >heroku config
    === limitless-tor-18923 Config Vars
    MONGODB_URI: mongodb://your_user:your_password@ds139278.mlab.com:39278/local_library_production
    NODE_ENV:    production
```

Heroku will restart your app when it updates the variables. If you check the home page now it should show zero values for your object counts, as the changes above mean that we're now using a new (empty) database.

**Managing addons**

Heroku uses independent add-ons to provide backing services to apps — for example email or database services. We don't use any addons in this website, but they are an important part of working with Heroku, so you may want to check out the topic [Managing Add-ons](https://devcenter.heroku.com/articles/managing-add-ons) (Heroku docs).

**Debugging**

The Heroku client provides a few tools for debugging:

```heroku
    heroku logs  # Show current logs
    heroku logs --tail # Show current logs and keep updating with any new results
    heroku ps   #Display dyno status
```


## Summary

In this exercise, we have provided you some guidance on your options for choosing a hosting site, a brief overview of what you need to do in order to get your Node app ready for production, and a practical example of how to install the Node app onto the [Heroku](https://www.heroku.com/) cloud hosting service.

