import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import { InputField, RadioGroupField } from 'components/FormFields';
import { Feedback } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface FeedbackFormProps {
  initialValues?: Feedback;
  onSubmit?: (formValues: Feedback) => void;
}

const schema = yup.object().shape({
  title: yup.string().required('Please enter what you would like to do?'),
  reason: yup.string().required('Please select a reason'),
  details: yup.string().when('reason', {
    is: 'other',
    then: yup.string().required('Please specify more details'),
  }),
});

export default function FeedbackForm({ initialValues, onSubmit }: FeedbackFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Feedback>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Feedback) => {
    try {
      await onSubmit?.(formValues);

      // Clear form once submit successfully
      reset({ title: '', reason: '', details: '' });
    } catch (error) {
      // handle to show generic error here
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="title" control={control} label="Title" />

        <RadioGroupField
          name="reason"
          control={control}
          label="Pick a reason"
          options={[
            { label: 'Reason A', value: 'reason_a' },
            { label: 'Reason B', value: 'reason_b' },
            { label: 'Other', value: 'other' },
          ]}
        />

        <InputField
          name="details"
          control={control}
          label="More details (required if other selected)"
        />

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
