import React from 'react';
import { connect } from 'react-redux';

const ProcessingMessageComponent = ({ messageToDisplay }) => (
    <div >
        <b>Processing please wait...{messageToDisplay}</b>
    </div>
);


/**
 *
 * @param state
 * @returns {{currentState: string}}
 */
const mapStateToProps = (state) => ({
    processingState: state.syncSpaceReducer.Processing.State,
    processingMessage: state.syncSpaceReducer.Processing.Message
});


const ProcessingMessageContainer = connect(mapStateToProps)(ProcessingMessageComponent);

export default ProcessingMessageContainer;
