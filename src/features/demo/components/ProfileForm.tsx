import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { AddressListField } from 'components/FormFields';
import { Profile } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface ProfileFormProps {
  initialValues?: Profile;
  onSubmit?: (formValues: Profile) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Please enter what you would like to do?'),
  addressList: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Please enter name'),
      address: yup.string().required('Please enter address'),
    })
  ),
});

export default function ProfileForm({ initialValues, onSubmit }: ProfileFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Profile>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Profile) => {
    try {
      await onSubmit?.(formValues);

      // Clear form once submit successfully
      reset();
    } catch (error) {
      // handle to show generic error here
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Profile Name" />

        <AddressListField name="addressList" control={control} label="Address List" />

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
