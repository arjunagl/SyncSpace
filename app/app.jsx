var fonts = require('./stylesheets/fonts.scss');
var css = require('./stylesheets/styles.scss');
var React = require('react');
var App = require('./App/App');
var ReactDom = require('react-dom');

// alert('hello world');
document.write("Webpack for the wins!");
alert(document.getElementById('syncspace'));
ReactDom.render(
  <App />,
  document.getElementById('syncspace')
);
