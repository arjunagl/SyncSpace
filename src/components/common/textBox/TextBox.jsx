import React from 'react';
import { connect } from 'react-redux';
/**
 * 
 * 
 * @class Button
 * @extends {React.}
 */
class TextBox extends React.Component {

    /**
     * 
     * 
     * @returns 
     * 
     * @memberof TextBox
     */
    render() {
        return (
            <button
                className={this.props.className} onClick={this.props.onClick}
                style={this.props.style}
            >
                {this.props.content}
            </button>
        );
    }
}

const mapDispatchToProps = () => ({
});

const TextBoxComponent = connect(mapDispatchToProps)(TextBox);
export default TextBoxComponent;
