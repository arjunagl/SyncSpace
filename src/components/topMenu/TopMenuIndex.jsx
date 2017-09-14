import React from 'react';
import { browserHistory } from 'react-router';
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
        browserHistory.push(e.target.dataset.href);
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
                            <li className={this.isExpanded()}><a href="#1">Home</a></li>
                            <li className={this.isExpanded()}><a href="#2">About</a></li>
                            <li className={this.isExpanded()}>
                                <a href="#3" onClick={this.onMenuItemSelected} data-href='completedsavedshopping'>Saved Items</a>
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
