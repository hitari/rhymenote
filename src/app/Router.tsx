import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { RhymeSearch } from '../features/rhymeSearch/RhymeSearch';
import { RhymeList } from '../features/rhymeList/RhymeList';

export function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <RhymeSearch />
      </Route>
      <Route path="/list">
        <RhymeSearch />
        <RhymeList />
      </Route>
    </Switch>
  );
}
