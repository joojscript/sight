import Home from 'pages/Home';
import Menu from 'pages/Menu';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/visualization" component={Menu} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
