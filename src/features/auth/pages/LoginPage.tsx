import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { authActions } from '../authSlice';



const useStyles  = makeStyles ((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowwrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  box: {
    padding: theme.spacing(3),
  },
}));


export interface LoginPageProps {
}

export default function LoginPage (props: LoginPageProps) {

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(state=>state.auth.logging)

  //const userInfo = useAppSelector(selectCurrentUser);
  
  const handleLoginClick = () => {
    //Todo: get username + pass from login form
    dispatch(
      authActions.login({
        username: "Tommy",
        password: "Tommy"
      })
    );
  };

  /*const initialState = { username: '', password: '' }
  const [userLogin, setUserLogin] = useState(initialState)
  const { username, password } = userLogin
  const [typePass, setTypePass] = useState(false)

  const handleChangeInput = (e: HTMLInputElement) => {
    const {value, name} = e.target
    setUserLogin({...userLogin, [name]:value})
  }
*/
  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.box}>
        <Typography variant="h5" component="h1">Student Management</Typography>


        {/* <form onSubmit={handleLoginClick}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Email / Phone number
            </label>
            <input type="text" className="form-control" id="username"
            name="username"  />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>

            <div className="pass">
              <input type="password"
              className="form-control" 
              id="password"
              name="password" />

             
            </div>
          </div>
          <button type="submit" className="btn btn-dark w-100 mt-1">
            Login
          </button>
        </form> */}




        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
          {isLogging && <CircularProgress size={20} color="secondary"/> }&nbsp;Fake Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
