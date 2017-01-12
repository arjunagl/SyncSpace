var React = require('react');

class App extends React.Component {
    render() {
        return <div className ="nav">
            <header role="banner">
                <nav role='navigation'>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Catalog</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </nav>
            </header>
        </div>;
    }
}

module.exports = App;
