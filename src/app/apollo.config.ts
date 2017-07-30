import {ApolloClient, createNetworkInterface} from 'apollo-client';

const networkInterface = createNetworkInterface('https://api.graph.cool/simple/v1/cj5p1jggln5zg0160260jw7k5');

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {
        Authorization: ''
      };  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    req.options.headers.Authorization = `Bearer ${localStorage.getItem('auth-token')}` || null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface,
});


export function provideClient(): ApolloClient {
  return client;
}
