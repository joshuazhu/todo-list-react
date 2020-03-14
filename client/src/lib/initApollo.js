import { useContext } from 'react';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { Auth0Context } from '../context/Auth0Context';


const useAuth0 = () => useContext(Auth0Context);
const { getTokenSilently } = useAuth0();

const authLink = () => {
  setContext(() => {
    return getTokenSilently().then(token => ({
      headers: {
        authorization: token ? { token } : ""
      }
    }))
  });
};

const httpLink = () => {
  const GRAPHQL_API_ENDPOINT = process.env.REACT_APP_API_URL;

  return new HttpLink({
    credentials: 'same-origin',
    uri: GRAPHQL_API_ENDPOINT,
  });
}

const createApolloClient = (
  initialState,
  options
) => {

}