var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var reqPromise = require('request-promise');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var users = require('./users.json');

//Details of webservice
app.get('/', function(req, res) {
    res.send("Pushfication - Push Notification service");
});

//Register user with username and accessToken
// POST: http://localhost:3000/registerUser?username=bbc1&accessToken=4234
app.post('/registerUser', function(req, res) {
    var username = req.query.username;
    var accessToken = req.query.accessToken;
    if(username && accessToken) {
        res.send(registerUser(username, accessToken));
    } else {
        res.status(400).send("Check the Username and AccessToken");
    }
});

function registerUser(username, accessToken) {
    var user = new Object();
    user.username = username;
    user.accessToken = accessToken;
    user.creationTime = new Date();
    user.numOfNotificationsPushed = 0;
    return user;
}

// Get all the registered users
//GET: http://localhost:3000/getAllRegisteredUsers
app.get('/getAllRegisteredUsers', function(req, res) {
    res.send(users);
});

//Push Notification into Devices
// POST: http://localhost:3000/pushNotification?body=Good Morning&type=note&username=bbcUser4&title=Greetings
app.post('/pushNotification', function(req, res) {
    var reqQuery = req.query;
    var username = reqQuery.username? reqQuery.username: null;
    if (username) {
        var user = getUser(username);
        if (user) {
            var accessToken = user.accessToken;
            var type = reqQuery.type ? reqQuery.type : null; // check for 'type' is already handled in PushBullet
            var device_iden = reqQuery.device_iden ? reqQuery.device_iden : null;
            var email = reqQuery.email ? reqQuery.email : null;
            var channel_tag = reqQuery.channel_tag ? reqQuery.channel_tag : null;
            var client_iden = reqQuery.client_iden ? reqQuery.client_iden : null;
            var source_device_iden = reqQuery.source_device_iden ? reqQuery.source_device_iden : null;
            var guid = reqQuery.guid ? reqQuery.guid : null;
            var body = reqQuery.body ? reqQuery.body : null;
            var title = reqQuery.title ? reqQuery.title : null;
            var url = reqQuery.url ? reqQuery.url : null;
            var file_name = reqQuery.file_name ? reqQuery.file_name : null;
            var file_type = reqQuery.file_type ? reqQuery.file_type : null;
            var file_url = reqQuery.file_url ? reqQuery.file_url : null;
            httpPushNotification(accessToken, body, title, type, url, file_name, file_type, file_url, device_iden, email, channel_tag,
                client_iden, source_device_iden, guid).then(function (result) {
                user.numOfNotificationsPushed ++; // must have done changes in the database realtime
                res.send(result);
            });
        } else {
            res.status(400).send("Please check the Username");
        }
    } else {
        res.status(400).send("Provide Username");
    }
});

function httpPushNotification(accessToken, body, title, type, url, file_name, file_type, file_url, device_iden, email,
                              channel_tag, client_iden, source_device_iden, guid) {
    var options = {
        method: 'POST',
        uri: 'https://api.pushbullet.com/v2/pushes',
        headers: {
            'Content-Type': 'application/json',
            'Access-Token': accessToken
        },
        json: {
            'title': title,
            'body':  body,
            'type': type,
            'url': url,
            'file_name': file_name,
            'file_type': file_type,
            'file_url': file_url,
            'device_iden': device_iden,
            'email': email,
            'channel_tag': channel_tag,
            'client_iden': client_iden,
            'source_device_iden': source_device_iden,
            'guid': guid
        }
    };
    console.log("Options "+options.json);
    return reqPromise(options)
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            return err;
        });
}

function getUser(username) {
    var user = null;
    users.forEach(function(item) {
        if(item.username.toUpperCase() == username.toUpperCase()) user = item;
    });
    return user;
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
