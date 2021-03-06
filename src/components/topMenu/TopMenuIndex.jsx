import React from 'react';
import LoginStatusContainer from './LoginStatusContainer';
import styles from './TopMenuIndex.scss';

class TopMenuComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isExpanded: false };
        this.onMenuItemSelected = this.onMenuItemSelected.bind(this);
        this.expandMenu = this.expandMenu.bind(this);
    }

    onMenuItemSelected(e) {
        console.log(e);
        this.props.history.push(e.target.dataset.href);
    }

    expandMenu(e) {
        const expandedState = !this.state.isExpanded;
        e.preventDefault();
        this.setState({
            isExpanded: expandedState
        });
        console.log(`Expanded state ${expandedState}`);
    }

    isExpanded() {
        const isExpanded = (this.state.isExpanded) ? styles.Expanded : styles.Hidden;
        return isExpanded;
    }

    render() {
        return (
            <div className={styles.topMenuIndex}>
                <header role="banner">
                    <nav role='navigation'>
                        <ul>
                            <li className={styles.expando}>
                                <a href="#1" onClick={this.expandMenu}>☰</a>
                            </li>
                            <li className={this.isExpanded()}>
                                <a href="" onClick={this.onMenuItemSelected} data-href='/landing'>Home</a>
                            </li>
                            <li className={this.isExpanded()}><a href="">About</a></li>
                            <li className={this.isExpanded()}>
                                <a href="" onClick={this.onMenuItemSelected} data-href='/completedsavedshopping'>Saved Items</a>
                            </li>
                            <li className={this.isExpanded()}><LoginStatusContainer /></li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}

export default TopMenuComponent;
