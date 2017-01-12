var fonts = require('./stylesheets/fonts.scss');
var css = require('./stylesheets/styles.scss');
var React = require('react');
var App = require('./App/app');

// alert('hello world');
document.write("Webpack for the wins!");

React.render(
  <App />,
  document.getElementById('syncspace')
);
