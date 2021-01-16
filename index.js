const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const userModel = require('./DB/Models/userModel');
const logModel = require('./DB/Models/logModel');



const app = express();
app.use(bodyParser.json());

app.post('/addUsers', (req, res) => {

    const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        age: req.body.age,

    });
    user.save().then((data) => {
        console.log(`User added successfully` + data);
        res.json({ data: data });
    }).catch((err) => {
        console.error(err);
    });


});

app.post('/addFile', (req, res) => {
    var contents = [];
    var users = {};
    let readStream = fs.createReadStream(path.join(__dirname, './Files', 'Newsletter_Demo.csv'));
    //let writeStream = fs.createWriteStream(path.join(__dirname, './Files' , 'abc.txt'));
    readStream.pipe(csv()).on('data', (row) => {
        console.log('Data from csv files are ' + row.NEWSLETTER_CONTENT);
        contents.push(row.NEWSLETTER_CONTENT);
        console.log('Contents array ' + contents);
        users.email = row.EMAILADDRESS;
        console.log('Users array ' + users);
        userModel.findOne({ "email": users.email })
            .then((data) => {
                let user = data.email;
                let firstName = data.firstName;
                contents.push(firstName);
                let lastName = data.lastName;
                contents.push(lastName);
                console.log('Checking if the contents persist inside finding.....' + contents.toString());
                console.log('Email to be sent to ' + user);
                sendMail(user, contents);

            }).then(() => {
                let log = new logModel({
                    content: contents,
                    sentTo: user,
                    createdAt: Date.now()
                });
                log.save();
            }
            )
            .then((logData) => {
                console.log('Log data looks like this ' + logData);
            })
            .catch(err => console.error(err));
    })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });




});


async function sendMail(user, contents) {

    let transporter = nodemailer.createTransport({
        host: "***",
        port: 123,
        secure: false, 
        auth: {
            user: abc,
            pass: xyz 
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '***@*', 
        to: user, 
        subject: "Hello", // Subject line
        text: contents, // plain text body
        html: `<b>${contents}</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

}

module.exports = app;