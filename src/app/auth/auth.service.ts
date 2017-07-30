import {Injectable} from '@angular/core';
import gql from 'graphql-tag';
import {Apollo} from 'apollo-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

const loginMutation = gql`
  mutation signinUser($email:AUTH_PROVIDER_EMAIL){
    signinUser(email:$email){
      token,
      user{
        email,
        card{
          scans{
            value,
            place{
              name,
              lat,
              lon
            }
          }
        }
      }
    }
  }
`;

const registerMutation = gql`
  mutation createUser($cardId:ID!,$authProvider:AuthProviderSignupData!){
    createUser( cardId:$cardId, authProvider:$authProvider){
      id
    }
  }
`;

@Injectable()
export class AuthService {
  token = '';
  TOKEN_KEY_LOCAL_STORAGE = 'auth-token';

  constructor(private apollo: Apollo) {
  }

  login(credentials: { email: string, password: string }): any {
    console.log('cred', credentials);
    return this.apollo.mutate({
      mutation: loginMutation,
      variables: {
        email: credentials
      }
    })
      .do(({ data }) => {
        const { signinUser }: any = data;
        this.setAuthTokenInLocalStorage(signinUser.token);
      }).catch(() => {
        return Observable.throw(new Error('Login Fails'));
      });
  }

  register(credentials: { email: string, password: string }, cardId): any {
    return this.apollo.mutate({
      mutation: registerMutation,
      variables: {
        cardId,
        authProvider: {
          email: credentials
        }
      }
    })
      .catch(() => {
        return Observable.throw(new Error('Register Fails'));
      });
  }

  private getAuthTokenFromLocalStorage(): string {
    return localStorage.getItem(this.TOKEN_KEY_LOCAL_STORAGE);
  }

  private setAuthTokenInLocalStorage(token: string): void {
    localStorage.setItem(this.TOKEN_KEY_LOCAL_STORAGE, token);
  }

  get isAuthenticated(): boolean {
    return !!this.getAuthTokenFromLocalStorage();
  }

  removeAuthTokenFromLocalStorage() {
    localStorage.setItem(this.TOKEN_KEY_LOCAL_STORAGE, null);
  }
}
