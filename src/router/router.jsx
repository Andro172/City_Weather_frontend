import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import ProtectedRoute from '../components/ProtectedRoute';
import MyNavbar from '../components/MyNavbar';
import MyFooter from '../components/MyFooter';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Account from '../views/Account';
import AdminRoute from '../components/admin/AdminRoute';
import UserList from '../views/UserList';

function AppRouter() {
  return (
    <Router history={history}>
      <MyNavbar />
      <Switch>
        <ProtectedRoute path="/" component={Home} exact />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/register" render={(props) => <Register {...props} />} />
        <ProtectedRoute path="/account" component={Account} />
        <AdminRoute path="/admin" component={UserList} />
        <ProtectedRoute component={Home} />
      </Switch>
      <MyFooter />
    </Router>
  );
}

export default AppRouter;
