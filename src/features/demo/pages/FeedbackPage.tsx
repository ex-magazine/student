import { Box, Container } from '@material-ui/core';
import { Feedback } from 'models';
import * as React from 'react';
import FeedbackForm from '../components/FeedbackForm';

export function FeedbackPage() {
  const initialValues: Feedback = {
    title: '',
    reason: '',
    details: '',
  };

  const handleFeedbackFormSubmit = (formValues: Feedback) => {
    console.log('Submit: ', formValues);
  };

  return (
    <Box>
      <Container>
        <FeedbackForm initialValues={initialValues} onSubmit={handleFeedbackFormSubmit} />
      </Container>
    </Box>
  );
}
