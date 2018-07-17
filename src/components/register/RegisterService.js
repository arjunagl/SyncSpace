import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const RegisterService = (_http, Config) => ({
    registerUser: (firstName, lastName, email) => {
        const client = new ApolloClient({
            uri: `${Config.usersEndPoint}`
        });

        client.mutate({
            variables: { userDetails: { Id: '1', firstName, lastName, email } },
            mutation: gql`
            mutation RegisterUser($userDetails: UserInput!){
                registerUser(userDetails: $userDetails){
                    Id
                    firstName
                    lastName
                    email                    
                }
            } `,
        })
            .then(data => console.log(data))
            .catch(error => console.log(error));
        return of({ status: true }).pipe(delay(1000));
    }
});

export default RegisterService;
