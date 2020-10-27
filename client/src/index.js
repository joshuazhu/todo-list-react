import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import App from './App';
import * as serviceWorker from './serviceWorker';
import "antd/dist/antd.css";

const client = new ApolloClient({
  connectToDevTools: window !== 'undefined' && process.env.NODE_ENV !== 'production',
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_API_URL
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
