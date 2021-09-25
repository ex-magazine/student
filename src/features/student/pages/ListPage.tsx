
import { Box, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/studentsApi';
import { useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Students } from 'models';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { selectStudentFilter, selectStudentList, selectStudentLoading, selectStudentPagination, studentActions } from '../studentSlice';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(1),
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems:  'center',

    marginBottom: theme.spacing(4),
  },
  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  }
}));

export default function ListPage () {
  const match = useRouteMatch();
  const history = useHistory();
  const studentList = useAppSelector(selectStudentList);
  const pagination = useAppSelector(selectStudentPagination);
  const filter = useAppSelector(selectStudentFilter);
  const loading = useAppSelector(selectStudentLoading);
  const cityMap = useAppSelector(selectCityMap);
  const cityList = useAppSelector(selectCityList);

  const dispatch = useDispatch();
  const classes = useStyles();
  /*
  useEffect(() => {
    dispatch(studentActions.fetchStudentList({
      _page:1,
      _limit: 20,

    }))
  }, [dispatch]);*/
  useEffect(() => {
    dispatch(studentActions.fetchStudentList(filter))
  }, [dispatch, filter]);

  const handlePageChange = (e: any, page:number) => {
    dispatch(studentActions.setFilter({
      ...filter,
      _page: page,      
    }))
  };

  const handleSearchChange = (newFilter: ListParams) => {
    console.log('Search change: ', newFilter);
    dispatch(studentActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    console.log('Search change: ', newFilter);
    dispatch(studentActions.setFilter(newFilter));
  };

  const handleRemoveStudent = async (student: Students) => {
    console.log ("Handle remove student", student);
    try {
      await studentApi.remove(student.id || '');
      //Trigger to re-fetch student list with current filter
      toast.success('🦄 Wow Success remove', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const newFilter = {...filter};
      dispatch(studentActions.setFilter(newFilter));
    } catch (error) {
      console.log("Handle remove", error);
    }
  }

  const handleEditStudent = async (student: Students) => {
    history.push(`${match.url}/${student.id}`)
  }
  return (
    <Box className={classes.root}>
      {loading && <LinearProgress className={classes.loading} />}
      <Box className={classes.titleContainer}>
        <Typography variant="h4">Students</Typography>
        <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Add New Student
          </Button> 
        </Link>              
      </Box>
        {/**Student Filter */}
        <Box mb={3}>
          <StudentFilters filter={filter} cityList={cityList} onSearchChange={handleSearchChange} onChange={handleFilterChange} />
        </Box>

        {/**Student Table */}
        <StudentTable studentList={studentList} cityMap = {cityMap} onEdit={handleEditStudent} onRemove={handleRemoveStudent}/>
        {/**Pagination */}
        <Box my={2} display="flex" justifyContent="center">
          <Pagination color="primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)} page={pagination?._page} onChange={handlePageChange} />
        </Box>       
    </Box>
  );
}

