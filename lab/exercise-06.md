# Exercise 5: Emailing and File handling

**Overview**

In this exercise, we’ll explain how to use Node.js email module and file system to handle emails and project/system files. We’ll also explore other email handling modules like Nodemailer and equally demonstrate how to handle file uploads with multer. 


## Emailing with Nodemailer

Nodemailer is a module for Node.js applications to allow easy as cake email sending. We will demonstrate sending an actual email in this module so we’ll build the app along as we progress in the course. To add this module to your Node application, install the package using npm like so :

```bash
    npm install nodemailer --save
```

Once installed, add it to your project using the `require` keyword. Now create a new file in your project directory called `nodemailer.js`  and set it up like so:

```bash
    var nodemailer = require('nodemailer');
```

From this point you can use the `nodemailer` variable to perform other operations like sending emails etc.

**Task 1: Sending Emails**

Now that we have `nodemailer` set up, you are ready to send emails from your server. In this task we’ll demonstrate how you can use your username and password from your selected email provider to send an email. 

With Nodemailer, there are basically three distinct steps involved in sending email messages:


1. Create a Nodemailer transporter using either [SMTP](https://nodemailer.com/smtp/) or  [any other](https://nodemailer.com/transports/) transport mechanism of your choosing
2. Set up [message options](https://nodemailer.com/message/) (who sends what to whom)
3. Finally deliver the message object using the `sendMail()` method of your previously created transporter.

Open the newly created `nodemailer.js` file and update it like this:

```javascript
    var nodemailer = require('nodemailer');
    //set up SMTP transporter 
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });
    
    //set up message options
    var mailOptions = {
      from: 'youremail@gmail.com',
      to: 'myfriend@yahoo.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    //deliver message
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
```

Where

- **mailOptions** defines the mail content (see [message configuration](https://nodemailer.com/message/) for possible options)
- **callback** is an optional callback function to run once the message is delivered or it failed
  - **error** is the error object if message failed
  - **info** includes the result, the exact format depends on the transport mechanism used
    - **response** is a string returned by SMTP transports and includes the last SMTP response from the server


And that's it! Now your server is able to send emails. Provide proper email details and replace the email placeholders in the code above with your proper details, when you run this file, it’ll deliver the email to the specified email address in the `mailOptions` object. I will fill up the `auth` object in the transporter with my gmail account details and also update the `mailOptions` object with my second email details like:

```bash
      var mailOptions = {
        from: 'my_email_address@gmail.com',
        to: 'my_second_email@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
      };
```

Finally before you run the file, You have to do two more things that will allow this application communicate directly with your email address. 

First go here and enable access for "less secure" apps: [https://www.google.com/settings/security/lesssecureapps](https://www.google.com/settings/security/lesssecureapps)


![](https://d2mxuefqeaa7sj.cloudfront.net/s_D21B4C606A947DEE8F7C4E5F71549FD80985291191086BC372ABBAADC75AD729_1525966714846_Allowleessecure.jpg)


Then go here: [https://accounts.google.com/b/0/DisplayUnlockCaptcha](https://accounts.google.com/b/0/DisplayUnlockCaptcha) and click Continue to enable recaptcha verification.

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D21B4C606A947DEE8F7C4E5F71549FD80985291191086BC372ABBAADC75AD729_1525966643203_captcha.jpg)


Now when you navigate back to your terminal and run the `nodemailer` file:

```bash
    $ node nodemailer
```

You should see this on your terminal:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D21B4C606A947DEE8F7C4E5F71549FD80985291191086BC372ABBAADC75AD729_1525966914984_term.jpg)


To verify that the email was actually sent to the provided email address, i’ll log into the email and check the inbox:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D21B4C606A947DEE8F7C4E5F71549FD80985291191086BC372ABBAADC75AD729_1525968066730_newMail.jpg)


Awesome, we got the email delivered to gmail.

**Task 2: Sending to multiple receivers**

Sending email to multiple receivers works just the same as your traditional emailing applications. To send an email to more than one receiver, simply add them to the `to` property of the `mailOptions` object, separated by a comma:

```javascript
    var mailOptions = {
      from: 'youremail@gmail.com',
      to: 'myfriend@yahoo.com, myotherfriend@yahoo.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    }
```

Here we can add as many email addresses to the `to` property and it’ll get delivered to all of them.

**Task 3: Send HTML**

This is one good advantage of using nodemailer. It gives you the option of sending not just text as emails but also HTML formatted emails.  To send HTML formatted text in your email, the "text" property replace the `text` property of the `mailOptions` object with `html` like this:

```javascript
    var mailOptions = {
      from: 'youremail@gmail.com',
      to: 'myfriend@yahoo.com',
      subject: 'Sending Email using Node.js',
      html: '<h1>Welcome</h1><p>That was easy!</p>'
    }
```

To verify that we received the HTML, lets check back on gmail:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_D21B4C606A947DEE8F7C4E5F71549FD80985291191086BC372ABBAADC75AD729_1525967884231_NewHTML+fomat.jpg)


We have successfully built a Node application that sends emails with the Nodemailer module.


## File handling

Handling file upload in Node.js is a major part of the Node developement technique. Often when you build applications, you tend to allow users upload files from their devices on to your application. During developement, you may also run into situations where you have to upload files to your application. 

**Task 4: Multer**

Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. It adds a `body` object and a `file` or `files` object to the `request` object. The `body` object contains the values of the text fields of the form, the `file` or `files` object contains the files uploaded via the form. In this task we’ll demonstrate how you can easily upload files to your Node application using the Multer module.

**Task 5: Uploading files with Multer**

Now lets demonstrate how we can upload files to our Node application using multer. First lets install the multer package. In your terminal, run:

```bash
    $ npm install --save multer
```

Now in your project root folder, create a new file called `multerUpload.js` and require the the multer module with express:

```javascript    
    const multer = require('multer');
    const express = require('express');
    const app = express();
```

Next we define the storage location where we’d like multer to store the uploads:

```javascript
    const multer = require('multer');
    const express = require('express');
    const app = express();
    const upload = multer({
      dest: 'uploads/' 
      // this saves your file into a directory called "uploads"
    }); 
```
    

Multer will automatically create the `uploads` folder if it doesn’t exist.

Lets now create a HTML file that will provide us a form where we’ll trigger this upload from. Create a new file called `multerform.html` and update it with this code:

```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Simple Multer Upload Example</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <form action="/" enctype="multipart/form-data" method="post">
          <input type="file" name="file-to-upload">
          <input type="submit" value="Upload">
        </form>  
      </body>
    </html>
```

Now lets set up our Node server in the `multerUploads.js` file and define the routes that will post and get the file respectively. Open the file and update it like this:

```javascript
    const express = require('express');
    const multer = require('multer');
    const app = express();
    const upload = multer({
      dest: 'uploads/' // this saves your file into a directory called "uploads"
    }); 
    
    app.get('/', (req, res) => {
      res.sendFile(__dirname + '/multerform.html');
    });
    
    // It's crucial that the file name matches the name attribute in your html
    
    app.post('/', upload.single('file-to-upload'), (req, res) => {
      res.redirect('/');
      //defined our upload route
    });
    
    app.listen(2345, function(){
        console.log('Server is running at port: ',2345);
      });
```

To test that our upload is working, navigate to your terminal and run:

```bash
    $ node multeruploads
```

This will start your server on the specified port `2345` so when you navigate to `127.0.0.1:2345` you should see:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_D21B4C606A947DEE8F7C4E5F71549FD80985291191086BC372ABBAADC75AD729_1525972441155_uploadFile.jpg)


Now when you click the Choose File button, it’ll launch your explorer for you to select a file. Once you selected a file, click the Upload button to upload the selected file.

Now go back to your project folder, open the `uploads` folder that was created be default and should now find that your file has been uploaded successfully:


![](https://d2mxuefqeaa7sj.cloudfront.net/s_D21B4C606A947DEE8F7C4E5F71549FD80985291191086BC372ABBAADC75AD729_1525973482532_uploaded.jpg)

## Summary

In this exercise we have demonstrated how to send emails through our Node application. We used the Nodemailer module to build a Node application that allows you send emails. Furthermore, we demonstrated how to handle file uploads with the multer module in our Node application. 


