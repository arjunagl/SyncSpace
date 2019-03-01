import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const RegisterServiceMock = (http, Config) => ({
    registerUser: (firstName, lastName, email) =>
        of({ status: true }).pipe(delay(1000))
});
export default RegisterServiceMock;
