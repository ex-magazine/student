import { Box, Button, Typography } from '@material-ui/core';
import { InputField } from 'components/FormFields';
import React from 'react';
import { Control, useFieldArray } from 'react-hook-form';

export interface AddressListFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
}

export function AddressListField({ name, control, label }: AddressListFieldProps) {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  return (
    <>
      <Box display="flex" mt={3} justifyContent="left" alignItems="center">
        <Typography variant="h5">{label}</Typography>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          size="small"
          style={{ marginLeft: '10px' }}
          onClick={() => append({ id: new Date().getTime(), name: '', address: '' })}
        >
          Add new address
        </Button>
      </Box>

      {fields.map((field, idx) => (
        <Box key={field.id} my={3}>
          <Typography variant="subtitle1">Address {idx + 1}</Typography>
          <InputField name={`${name}.${idx}.name` as const} control={control} label="Name" />
          <InputField name={`${name}.${idx}.address` as const} control={control} label="Address" />
          <Button
            type="submit"
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => remove(idx)}
          >
            Remove
          </Button>
        </Box>
      ))}
    </>
  );
}
