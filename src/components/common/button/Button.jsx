import React from 'react';
import { connect } from 'react-redux';
/**
 * 
 * 
 * @class ButtonComponent
 * @extends {React.Component}
 */
class ButtonComponent extends React.Component {

    /**
     * 
     * 
     * @returns 
     * 
     * @memberof ButtonComponent
     */
    render() {
        return (
            <button
                id={this.props.id} className={this.props.className} onClick={this.props.onClick}
                style={this.props.style}
            >
                {this.props.content}
            </button>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    // onClick: () => {
    //     alert('clicked');
    // },
});

const ButtonContainer = connect(mapDispatchToProps)(ButtonComponent);
export default ButtonContainer;
