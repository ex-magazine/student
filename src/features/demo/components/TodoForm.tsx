import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import { Todo } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface TodoFormProps {
  initialValues?: Todo;
  onSubmit?: (formValues: Todo) => void;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required('Please enter what you would like to do?')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
});

export default function TodoForm({ initialValues, onSubmit }: TodoFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<Todo>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Todo) => {
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
        <InputField name="title" control={control} label="What to do next?" />

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
