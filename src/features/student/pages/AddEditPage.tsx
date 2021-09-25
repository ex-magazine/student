import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React, { useState , useEffect} from 'react';
import { Link,useParams,useHistory } from 'react-router-dom';
import { Students } from 'models';
import {  toast } from 'react-toastify';
import studentApi from 'api/studentsApi';
import StudentForm from '../components/StudentForm';


export default function AddEditPage () {
  const history = useHistory();
  const {studentId} = useParams<{studentId: string}>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Students>();

  useEffect(()=> {
    if (!studentId) return;

    //IFFE
    (async () => {
      try {
        const response: Students = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log("Failed to fetch student details", error);
      }
    })();

  }, [studentId]);

  console.log('Found Student', student);

  const handleStudentFormSubmit = async (formValues: Students) => {
    //Todo handle submit here, call API to add/update student
    console.log ("error lan nua ",formValues);

    if (isEdit) {
      await studentApi.update(formValues);
    } else {
      await studentApi.add(formValues);
    }
    toast.success('🦄 Wow Success Add/Edit', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
    //throw new Error('test error');
    //Redirect back to student list
    history.push('/admin/students');
  }

  const initialValues: Students = {
    name: '',
    age: '',
    mark: '',
    gender: 'male',
    city: '',
    ...student
  } as Students;

  return (
    <Box>
      <Link to="/admin/students">
        <Typography variant="caption" style={{display: 'flex', alignItems: 'center'}}>
          <ChevronLeft />Back to student list
        </Typography>
      </Link>
      <Typography variant="h4">{isEdit ? 'Update Student Info' : 'Add new student'}</Typography>
      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm initialValues={initialValues} onSubmit={handleStudentFormSubmit} />
        </Box>
      )}
      
    </Box>
  );
}
