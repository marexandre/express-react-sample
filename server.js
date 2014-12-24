'use strict';

require('node-jsx').install({ harmony: true });

var express = require('express');
var exphbs  = require('express-handlebars');
var Server  = require('http').Server;
var path    = require('path');
var React   = require('react');
var TestApp = require('./components/TestApp.react.jsx');

var users = require('./data/users.json');

/**
 * API
 */
var api = express()
  .get('/ping/:username', function(req, res) {
    var username = req.params.username;
    console.log('username: '+ username);
    res.json({ message: 'hooray! welcome to our api!' });
  });

/**
 * Web App
 */
var app = express();
// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use('/assets', express.static(path.join(__dirname, 'public/')));
app.use('/api', api);

app.get('/', function(req, res) {
  // Render React app to a HTML string
  var html = React.renderToString(
    React.createElement(TestApp, { users: users })
  );

  res.render('index', {
    markup: html,
    state: JSON.stringify(users)
  });
})

// app.listen(process.env.PORT || 3000, function() {
//   console.log('Point your browser at http://localhost:3000');
// });

var server = Server(app);
var io = require('socket.io')(server);

io.sockets.on('connection', function(socket) {
  console.log('connection');

  socket.on('disconnect', function(){
    console.log('disconnect');
  });
});

var interval = setInterval(function() {
  var id = users.length + 1;
  users.push({ 'id': id, 'name': 'User'+ id });

  // Send data to the  client
  io.sockets.emit('add_user', { user: users[id - 1] });

  if (users.length > 15) {
    console.log('--- clearInterval');
    clearInterval(interval);
  }
}, 10 * 1000);




var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Point your browser at http://localhost:'+ port);
});
