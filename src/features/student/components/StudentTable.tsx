import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@material-ui/core';
import { Students, City } from 'models';
import  React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { capitalizeString, getMarkColor } from 'utils';


export interface studentTableProps {
  studentList: Students[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Students) => void;
  onRemove?: (student: Students) => void;
}

const useStyles = makeStyles(theme => ({
  table: { },
  edit: {
    marginRight: theme.spacing(1)
  },
}));



export default function StudentTable({studentList,cityMap, onEdit, onRemove}: studentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Students>();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Students) => {
    //Set selected student

    //Show confirm dialog
    setSelectedStudent(student);
    setOpen(true);
  }

  const handleRemoveConfirm = (student: Students) => {
    //Call onRemove
    //Hide Dialog  
    onRemove?.(student);
    setOpen(false);
  }

  return (
    <>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Mark</TableCell>            
            <TableCell align="left">City</TableCell>            
            <TableCell align="right">Action</TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {studentList.map((student, idx) => (
            <TableRow key={student.id}>
              <TableCell width={310} align="left">{student.id}</TableCell>
              <TableCell align="left">{student.name}</TableCell>
              <TableCell align="left">{capitalizeString(student.gender)}</TableCell> 
              <TableCell align="left">
                <Box color={getMarkColor(student.mark)} fontWeight="bold"> 
                {student.mark}
                </Box>
              </TableCell>
              <TableCell align="left">{cityMap[student.city]?.name }</TableCell> 
              <TableCell align="right">
                <Button size="small" className={classes.edit} variant="contained" color="secondary" onClick={()=>onEdit?.(student)}>Edit</Button>
                <Button size="small" variant="outlined" color="secondary" onClick={()=>handleRemoveClick(student)}>Remove</Button>
              </TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/**Remove delete */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named "{selectedStudent?.name}". <br />This action cant be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={() => handleRemoveConfirm(selectedStudent as Students)} color="secondary" variant="contained" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>    
  );
}
