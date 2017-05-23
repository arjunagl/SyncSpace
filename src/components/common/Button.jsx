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
            <button className={this.props.className} onClick={this.props.onClick} style={this.props.style}>Simple button still under construction</button>
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
