/** @jsx React.DOM */

var React = require('react');
var Users = require('./Users.react.jsx');

module.exports = TestApp = React.createClass({
  // Update 'state' by using the `props` that were passed on initialization
  getInitialState: function() {
    return { users: this.props.users }
  },
  render: function() {
    return (
      <div className="users">
        <Users users={this.state.users} />
      </div>
    );
  }
});