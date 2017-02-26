import React from 'react';
import LoginStatus from './LoginStatus';
import styles from './TopMenuIndex.scss';

const TopMenuComponent = () => (
    <div className={styles.topMenuIndex}>
        <header role="banner">
            <nav role='navigation'>
                <ul>
                    <li><a href="#1">Home</a></li>
                    <li><a href="#2">About</a></li>
                    <li><a href="#3">Catalog</a></li>
                    <li><a href="#4">Contact Us</a></li>
                    <li><LoginStatus /></li>
                </ul>
            </nav>
        </header>
    </div>
);

export default TopMenuComponent;
