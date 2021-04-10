import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RhymeSearchPage from '@/features/rhymeSearch/RhymeSearchPage';
import RhymeListPage from '@/features/rhymeList/RhymeListPage';

export function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <RhymeSearchPage />
      </Route>
      <Route path="/list">
        <RhymeSearchPage />
        <RhymeListPage />
      </Route>
    </Switch>
  );
}
