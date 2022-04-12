import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'materialize-css'

import { useRoutes } from './routes/routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import NavBar from './components/navbar/navbar';
import Loader from './components/loader/loader';
import store from './store';

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
        }}
      >
        <Router>
          {isAuthenticated && <NavBar />}
          <div className="container">{routes}</div>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
