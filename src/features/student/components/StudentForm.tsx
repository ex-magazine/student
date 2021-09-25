import React, {useState} from 'react';
import { Students } from 'models';
import { useForm } from 'react-hook-form';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { InputField , RadioGroupField, SelectField} from 'components/FormFields';
import { useAppSelector } from 'app/hooks';
import { selectCityOptions } from 'features/city/citySlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Alert from '@material-ui/lab/Alert';




export interface StudentFormProps {
  initialValues?: Students;
  onSubmit?: (formValues: Students) => void;

}

const schema = yup.object().shape({
  name: yup.string().required("Please enter name.")
    .test('two-words', 'Please enter at least two words', 
      (value) => {
        if (!value) return true;        
        const parts = value?.split(' ') || [];
        return parts.filter((x) => Boolean(x)).length >=2 ;
      }),
  age: yup.number()
    .positive('Please enter a positive number.')
    .integer("Please enter an interger")
    .min(18,'Min is 18')
    .max(60, 'Max is 60')
    .required("Please enter age.")
    .typeError('Please enter a valid number.'),
  mark: yup.number()
    .min(0,'Min is 0')
    .max(10, 'Max is 10')
    .required("Please enter mark.")
    .typeError('Please enter a valid number.'),
  gender: yup.string()
    .oneOf(['male', 'female'], 'Please select male or female')
    .required("Please select gender."),
  city: yup.string()
    .required("Please select the city"),
});

export default function StudentForm ({initialValues,onSubmit}: StudentFormProps) {

  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>('');

  const { control, handleSubmit, formState: {isSubmitting} } = useForm<Students>({   
    defaultValues: initialValues,   
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = async (formValues: Students) => {
     console.log('Submit:', formValues);
    // await new Promise((resolve) =>{
    //   setTimeout(resolve, 3000);
    // });

    try {
      //Clear previous submission error
      setError('');
      await onSubmit?.(formValues)
    } catch (error) {
      console.log("Failed to add/update student", error);
      setError('ok error');
    }

  }

  return (
    <Box maxWidth={450}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/**Form field */}
        <InputField name="name" control={control}  label="Full Name" />
        <RadioGroupField 
        name="gender" 
        control={control}  
        label="Gender" 
        options={[
          {label:'Male', value: 'male'},
          {label:'Female', value: 'female'},
        ]} />
        <InputField name="age" control={control}  label="Age" type="number" />
        <InputField name="mark" control={control}  label="Mark" type="number" />   

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control}  label="City" options={cityOptions} />  
        )}      

        {error && <Alert severity="error">{error}</Alert>}
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress  size={16} color="primary" />}&nbsp;Save</Button>
        </Box>
      </form>
    </Box>   
  );
}
