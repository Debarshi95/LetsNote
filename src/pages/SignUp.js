import { makeStyles, TextField } from "@material-ui/core";
import React from "react";
import ButtonSubmitting from "../components/ButtonSubmitting";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constant/routes";
import { auth } from "../firebase";
import { checkIfUserNameTaken, saveUserToDb } from "../features/userSlice";
import { useDispatch } from "react-redux";
import {
  PersonOutlineOutlined,
  EmailOutlined,
  LockOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  signUpRoot: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flex: 1,
    [theme.breakpoints.down("xs")]: {
      alignItems: "initial",
    },
  },
  signUpCard: {
    width: "440px",
    margin: "1rem auto",
    padding: "2rem 4rem",
    background: "#fff",
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "2rem 3rem",
      margin: 0,
    },

    "& > h1, h4": {
      textAlign: "center",
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    "& > h4": {
      margin: "0 0 22px 0",
    },
    "& > p": {
      textAlign: "center",
    },

    "& > form": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
}));

function SignUp() {
  const classes = useStyles();

  const [input, setInput] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const setSignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const usernameTaken = await dispatch(
        checkIfUserNameTaken(input.username)
      );
      // console.log(usernameTaken);
      if (usernameTaken) {
        setSubmitting(false);
        setInput({
          ...input,
          password: "",
        });
        setError("Username taken. Please try another one.");
      } else {
        const newUser = await auth.createUserWithEmailAndPassword(
          input.email,
          input.password
        );

        await dispatch(
          saveUserToDb({ user: newUser.user, username: input.username })
        );

        history.push(`/notes`);
      }
    } catch (err) {
      // console.log(err);
      setSubmitting(false);
      setInput({
        ...input,
        password: "",
      });
      setError(err.message);
    }
  };

  return (
    <div className={classes.signUpRoot}>
      {/* <IconButton
        className={classes.buttonBack}
        onClick={() => history.goBack()}
      >
        <ArrowBackSharp />
      </IconButton> */}
      <div className={classes.signUpCard}>
        <h1>Sign Up</h1>
        <h4>Sign up to get started</h4>

        <form autoComplete="off">
          <TextField
            type="text"
            name="username"
            variant="filled"
            placeholder="Username"
            aria-label="Username"
            value={input.username}
            onChange={({ target }) =>
              setInput({ ...input, [target.name]: target.value })
            }
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
            onChange={({ target }) =>
              setInput({ ...input, [target.name]: target.value })
            }
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
            onChange={({ target }) =>
              setInput({ ...input, [target.name]: target.value })
            }
            InputProps={{
              disableUnderline: true,
              startAdornment: <LockOutlined />,
            }}
          />
          <ButtonSubmitting
            submitting={submitting}
            submit={setSignUp}
            disabled={
              input.fullname === "" ||
              input.username === "" ||
              input.email === "" ||
              input.password === ""
            }
            btnText="Sign up"
          />
        </form>
        {error && <p className="error"> {error}</p>}
        <p>
          Have an account? <Link to={ROUTES.SIGN_IN}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
