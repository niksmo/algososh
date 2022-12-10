import './styles';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  MainPage,
  StringComponent,
  FibonacciPage,
  ListPage,
  QueuePage,
  SortingPage,
  StackPage,
} from 'components/pages';

export const App = () => (
  <div className="app">
    <BrowserRouter basename="/algososh">
      <Switch>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/recursion">
          <StringComponent />
        </Route>
        <Route path="/fibonacci">
          <FibonacciPage />
        </Route>
        <Route path="/sorting">
          <SortingPage />
        </Route>
        <Route path="/stack">
          <StackPage />
        </Route>
        <Route path="/queue">
          <QueuePage />
        </Route>
        <Route path="/list">
          <ListPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
