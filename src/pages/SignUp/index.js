import React, { useState } from 'react';
import { makeStyles, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { PersonOutlineOutlined, EmailOutlined, LockOutlined } from '@material-ui/icons';
import { requestSignUp } from '../../store/slices/auth';
import LoadingButton from '../../components/LoadingButton';
import routes from '../../utils/routes';
import strings from '../../constant/strings';
import Navbar from '../../components/Navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  cardContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 'inherit',
    background: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(50),
      borderRadius: '0.25rem',
      flex: 1,
      margin: 'auto',
      maxHeight: '72vh',
      padding: theme.spacing(3),
    },
    '& h1': {
      marginBottom: theme.spacing(1),
    },
    '& a': {
      textDecoration: 'none',
      fontWeight: 500,
      color: theme.palette.primary.main,
    },
  },
  cardForm: {
    margin: '2.5rem 0 0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SignUp = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const classes = useStyles();

  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();

    const { username, email, password } = input;
    if (!username || !email || !password) return;
    try {
      // Check if username taken is available or not
      const res = await dispatch(requestSignUp({ username, email, password })).unwrap();
      if (res?.id) {
        history.push(routes.notes.route);
      }
    } catch (err) {
      setInput({
        ...input,
        password: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.cardContainer}>
        <h1>{strings.SIGN_UP}</h1>
        <h4>{strings.GET_STARTED}</h4>

        <form autoComplete="off" className={classes.cardForm}>
          <TextField
            type="text"
            name="username"
            variant="filled"
            placeholder="Username"
            aria-label="Username"
            value={input.username}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              startAdornment: <PersonOutlineOutlined />,
            }}
          />
          <TextField
            type="email"
            name="email"
            variant="filled"
            placeholder="Email"
            aria-label="Email"
            value={input.email}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              startAdornment: <EmailOutlined />,
            }}
          />
          <TextField
            type="password"
            name="password"
            variant="filled"
            placeholder="Password"
            aria-label="Password"
            value={input.password}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              startAdornment: <LockOutlined />,
            }}
          />
          <LoadingButton
            loading={loading}
            onClick={handleSignup}
            text={strings.SIGN_IN}
            disabled={input.username === '' || input.email === '' || input.password === ''}
          />
        </form>
        {error && (
          <Typography component="h4" variant="body1" color="error" align="center">
            {error}
          </Typography>
        )}
        <Typography component="h4" variant="body1" align="center">
          Have an account? <Link to={routes.signin.route}>{strings.SIGN_IN}</Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignUp;
