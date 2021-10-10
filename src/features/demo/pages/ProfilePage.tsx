import { Box, Container } from '@material-ui/core';
import { Profile } from 'models';
import * as React from 'react';
import ProfileForm from '../components/ProfileForm';

export function ProfilePage() {
  const initialValues: Profile = {
    name: '',
    addressList: [{ id: new Date().getTime(), name: '', address: '' }],
  };

  const handleProfileFormSubmit = (formValues: Profile) => {
    console.log('Profile form submit: ', formValues);
  };

  return (
    <Box>
      <Container>
        <ProfileForm initialValues={initialValues} onSubmit={handleProfileFormSubmit} />
      </Container>
    </Box>
  );
}
