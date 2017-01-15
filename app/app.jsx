var fonts = require('./stylesheets/fonts.scss');
var css = require('./stylesheets/styles.scss');
var React = require('react');
var App = require('./App/App');
var ReactDom = require('react-dom');

ReactDom.render(
  <App />,
  document.getElementById('syncspace')
);
