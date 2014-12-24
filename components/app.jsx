/** @jsx React.DOM */

var React = require('react');
var TestApp = require('./TestApp.react.jsx');

// Snag the initial state that was passed from the server side
var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)

React.render(
  <TestApp users={initialState}/>,
  document.getElementById('react-app')
);
