import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AppFotter } from './cmp/AppFooter';
import { AppHeader } from './cmp/AppHeader';
import { UserMsg } from './cmp/UserMsg';
import routes from './routes/routes';

function App() {
  return (
    <Router>
      <UserMsg />
      <AppHeader />
      <main className="main-container">
        <Switch>
          {routes.map(route => <Route key={route.path} component={route.component} path={route.path} />)}
        </Switch>
      </main>
      <AppFotter />
    </Router>
  );
}

export default App;
