import { makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailOutlined, LockOutlined } from '@material-ui/icons';
import LoadingButton from '../../components/LoadingButton';
import Navbar from '../../components/Navbar';
import routes from '../../utils/routes';
import strings from '../../constant/strings';
import { requestSignIn } from '../../store/slices/auth';

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
    margin: '3rem 0 0.5rem 0',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function SignIn() {
  const [input, setInput] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      return;
    }
    const { email, password } = input;
    try {
      const res = await dispatch(requestSignIn({ email, password })).unwrap();
      if (res?.user) {
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
        <h1>{strings.SIGN_IN}</h1>
        <h4>{strings.SIGN_IN_CONTINUE}</h4>
        <form autoComplete="off" className={classes.cardForm}>
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            variant="filled"
            onChange={handleChange}
            value={input.email}
            InputProps={{
              disableUnderline: true,
              startAdornment: <EmailOutlined />,
            }}
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            variant="filled"
            value={input.password}
            onChange={handleChange}
            InputProps={{
              disableUnderline: true,
              startAdornment: <LockOutlined />,
            }}
          />

          <LoadingButton
            loading={loading}
            onClick={handleSignIn}
            text={strings.SIGN_IN}
            disabled={input.email === '' || input.password === ''}
          />
        </form>
        {error && (
          <Typography component="h5" variant="subtitle2" color="error" align="center">
            {error}
          </Typography>
        )}
        <Typography component="h4" variant="body1" align="center">
          Don&apos;t have an account? <Link to={routes.signup.route}>{strings.SIGN_UP}</Link>
        </Typography>
      </div>
    </div>
  );
}

export default SignIn;
