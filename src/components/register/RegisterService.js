import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const RegisterService = (_http, Config) => ({
    registerUser: (firstName, lastName, email) => {
        const client = new ApolloClient({
            uri: `${Config.usersEndPoint}`
        });

        return Observable.create(observer => {
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
                .then(data => {
                    console.log('User registration complete ', data);
                    // return of(data).pipe(delay(1000));
                    observer.next(data);
                })
                .catch(error => {
                    console.warn('Error registering user ', error);
                    observer.error(error);
                });
        });
    }
});

export default RegisterService;
