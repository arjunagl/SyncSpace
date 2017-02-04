import React, { Component, PropTypes } from 'react';

const TopMenuComponent = () => (
    <div className="nav">
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
    </div>
);

export default TopMenuComponent;