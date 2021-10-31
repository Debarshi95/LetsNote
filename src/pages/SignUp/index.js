import { makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { PersonOutlineOutlined, EmailOutlined, LockOutlined } from '@material-ui/icons';
import ButtonSubmitting from '../../components/ButtonSubmitting';
import routes from '../../constant/routes';
import strings from '../../constant/strings';
import { checkUserNameTaken, createUser, registerWithCredentials } from '../../services';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  cardWrapper: {
    width: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      width: '25rem',
      borderRadius: '0.25rem',
    },

    '& > h1, h4': {
      textAlign: 'center',
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    '& > h4': {
      margin: '0 0 1.25rem 0',
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

function SignUp() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const setSignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { username, email, password } = input;

    try {
      // Check if username taken is available or not
      const taken = await checkUserNameTaken(username);

      if (!taken) {
        const res = await registerWithCredentials(email, password);

        if (res?.user) {
          await createUser({ username, email, uid: res.user.uid });
          history.push(routes.notes.route);
        }
      }
    } catch (err) {
      setInput({
        ...input,
        password: '',
      });
      setError(err?.message || strings.SOMETHING_WENT_WRONG);
      setSubmitting(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.cardWrapper}>
        <h1>{strings.SIGN_UP}</h1>
        <h4>{strings.GET_STARTED}</h4>

        <form autoComplete="off">
          <TextField
            type="text"
            name="username"
            variant="filled"
            placeholder="Username"
            aria-label="Username"
            value={input.username}
            onChange={({ target }) => setInput({ ...input, [target.name]: target.value })}
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
            onChange={({ target }) => setInput({ ...input, [target.name]: target.value })}
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
            onChange={({ target }) => setInput({ ...input, [target.name]: target.value })}
            InputProps={{
              disableUnderline: true,
              startAdornment: <LockOutlined />,
            }}
          />
          <ButtonSubmitting
            submitting={submitting}
            submit={setSignUp}
            disabled={
              input.fullname === '' ||
              input.username === '' ||
              input.email === '' ||
              input.password === ''
            }
            btnText={strings.SIGN_UP}
          />
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Have an account? <Link to={routes.signIn.route}>{strings.SIGN_IN}</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
