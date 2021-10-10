import { NotFound, PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import LoginPage from 'features/auth/pages/LoginPage';
import { DemoFeature } from 'features/demo';
import { HomePage } from 'features/static/HomePage';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   cityApi.getAll().then((response) => {
  //     response.data.map((x) => x.code);
  //   });
  // });
  return (
    <>
      
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/demo">
          <DemoFeature />
        </Route>
        <Route path="/login">
          {' '}
          <LoginPage />{' '}
        </Route>
        <PrivateRoute path="/admin">
          <AdminLayout />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}

export default App;
