import { Box, Container, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface HomePageProps {}

export function HomePage(props: HomePageProps) {
  return (
    <Box textAlign="center">
      <Typography align="center" variant="h2" style={{ marginTop: 30 }}>
        Welcome to learn Redux Saga! ♥️
      </Typography>

      <Container>
        <Box mt="50px">
          <Link to="/login" style={{ fontSize: 18 }}>
            Login page
          </Link>
        </Box>

        <Box mt="20px">
          <Link to="/demo" style={{ fontSize: 18 }}>
            Demo page
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
