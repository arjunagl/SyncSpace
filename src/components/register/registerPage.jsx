import React from 'react';
// import RegisterComponentContainer from './RegisterComponent';
import { SyncFormControl } from '../../controls/SyncFormControl/SyncFormControl';
import { SyncFormInput } from '../../controls/SyncFormInput/SyncFormInput';
import { SyncFormLabel } from '../../controls/SyncFormLabel/SyncFormLabel';

class RegisterPage extends React.Component {
    render() {
        return (
            <SyncFormControl >
                <SyncFormInput />
                <SyncFormLabel />
            </SyncFormControl>
            // <RegisterComponentContainer />
        );
    }
}

export default RegisterPage;
