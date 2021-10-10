import { Container, Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { FeedbackPage } from './pages/FeedbackPage';
import { ProfilePage } from './pages/ProfilePage';
import { TodoPage } from './pages/TodoPage';

export interface DemoFeatureProps {}

export function DemoFeature(props: DemoFeatureProps) {
  const match = useRouteMatch();

  return (
    <>
      <Typography align="center" variant="h2" style={{ marginTop: 30 }}>
        Demo Page
      </Typography>

      <Container>
        <Grid container spacing={3} justify="center" style={{ marginTop: '10px' }}>
          <Grid item>
            <Link to="/demo/todos" style={{ fontSize: 18 }}>
              Simple Form - TodoPage
            </Link>
          </Grid>

          <Grid item>
            <Link to="/demo/feedback" style={{ fontSize: 18 }}>
              Dependent Field - FeedbackPage
            </Link>
          </Grid>

          <Grid item>
            <Link to="/demo/profile" style={{ fontSize: 18 }}>
              Field Array- ProfilePage
            </Link>
          </Grid>
        </Grid>
      </Container>

      <Switch>
        <Route path={`${match.path}/todos`}>
          <TodoPage />
        </Route>

        <Route path={`${match.path}/profile`}>
          <ProfilePage />
        </Route>

        <Route path={`${match.path}/feedback`}>
          <FeedbackPage />
        </Route>
      </Switch>
    </>
  );
}
