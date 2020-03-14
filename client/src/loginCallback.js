import { useContext } from 'react';
import App from './App';
import { Auth0Context } from './context/Auth0Context';

export default function loginCallback() {
  const useAuth0 = () => useContext(Auth0Context);

  const { isAuthenticated, user } = useAuth0();

  

}