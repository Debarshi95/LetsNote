import { makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EmailOutlined, LockOutlined } from '@material-ui/icons';
import ButtonSubmitting from '../components/ButtonSubmitting';
import * as ROUTES from '../constant/routes';
import { auth } from '../firebase';

const useStyles = makeStyles((theme) => ({
  signInRoot: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      alignItems: 'initial',
    },
  },
  signInCard: {
    width: '440px',
    margin: '1rem auto',
    padding: '2rem 4rem',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: '2rem 3rem',
      margin: 0,
    },

    '& > h1, h4': {
      textAlign: 'center',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    '& > h4': {
      margin: '0 0 22px 0',
    },
    '& > p': {
      textAlign: 'center',
    },

    '& > form': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
}));

function SignIn() {
  const classes = useStyles();

  const [input, setInput] = React.useState({ email: '', password: '' });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const history = useHistory();

  const setSignIn = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await auth.signInWithEmailAndPassword(input.email, input.password);
      history.push(`/notes`);
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      setError(err.message);
    }
    setInput({
      ...input,
      password: '',
    });
  };

  return (
    <div className={classes.signInRoot}>
      <div className={classes.signInCard}>
        <h1>Sign In</h1>
        <h4>Sign in to continue</h4>

        <form autoComplete="off">
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            variant="filled"
            value={input.email}
            onChange={({ target }) => setInput({ ...input, [target.name]: target.value })}
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
            value={input.password}
            variant="filled"
            onChange={({ target }) => setInput({ ...input, [target.name]: target.value })}
            InputProps={{
              disableUnderline: true,
              startAdornment: <LockOutlined />,
            }}
          />
          <ButtonSubmitting
            submitting={submitting}
            submit={setSignIn}
            disabled={input.email === '' || input.password === ''}
            btnText="Sign in"
          />
        </form>
        {error && <p className="error"> {error}</p>}
        <p>
          Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
