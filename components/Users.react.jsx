/** @jsx React.DOM */

var React = require('react');
var User = require('./User.react.jsx');

module.exports = Users = React.createClass({

  render: function() {
    //
    var content = this.props.users.map(function(result) {
      return (
        <User key={result.id} data={result} />
      );
    });

    return (
      <ul className="user-list">{content}</ul>
    );
  }

});
