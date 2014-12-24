/** @jsx React.DOM */

var React = require('react');

module.exports = User = React.createClass({
  render: function() {
    var data = this.props.data;

    return (
      <li>{data.id}: {data.name}</li>
    );
  }
});