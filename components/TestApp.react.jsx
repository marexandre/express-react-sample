/** @jsx React.DOM */

var React = require('react');
var Users = require('./Users.react.jsx');
var socket = require('socket.io-client')('http://localhost:3000');

module.exports = TestApp = React.createClass({
  // Update 'state' by using the `props` that were passed on initialization
  getInitialState: function() {
    return { users: this.props.users };
  },

  componentWillMount: function() {
    // HACK: when server side rendering we don't want to add socket.io
    // related code
    if (typeof document === 'undefined') {
      return;
    }
    socket.on('connect', function() {
      console.log('--- socket:: connect');
    });

    socket.on('add_user', this.addUser);

    socket.on('disconnect', function() {
      console.log('--- socket:: disconnect');
    });
  },

  addUser: function(data) {
    console.log('--- add_user ---');
    console.log(data.user);

    var users = this.state.users;
    users.push(data.user);
    // Update UI
    this.setState({ users : users});
  },

  render: function() {
    return (
      <div className="users">
        <Users users={this.state.users} />
      </div>
    );
  }

});
