import { makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailOutlined, LockOutlined } from '@material-ui/icons';
import ButtonSubmitting from '../../components/ButtonSubmitting';
import routes from '../../constant/routes';
import strings from '../../constant/strings';
import { requestSignIn } from '../../store/slices/auth';

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
  link: {
    color: theme.palette.primary.main,
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
      <div className={classes.cardWrapper}>
        <h1>{strings.SIGN_IN}</h1>
        <h4>{strings.SIGN_IN_CONTINUE}</h4>

        <form autoComplete="off">
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
          <ButtonSubmitting submitting={loading} submit={handleSignIn} btnText={strings.SIGN_IN} />
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Don&apos;t have an account?{' '}
          <Link to={routes.signup.route} className={classes.link}>
            {strings.SIGN_UP}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
