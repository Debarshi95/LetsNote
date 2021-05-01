import { IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import ButtonSubmitting from "../components/ButtonSubmitting";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constant/routes";
import { auth } from "../firebase";
import { checkUsernameExists, saveUserToDb } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { ArrowBackSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  signUpRoot: {
    width: "100%",
    background: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  signUpCard: {
    width: "440px",
    margin: "1rem auto",
    padding: "2rem 4rem",
    border: `1.5px solid ${theme.palette.secondary.main}`,
    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      border: 0,
      padding: "2rem 3rem",
      height: "100%",
    },

    "& >h1,p": {
      textAlign: "center",
    },

    "& >p": {
      margin: "2rem 0",
    },

    "& > form": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    "& input": {
      border: `1.8px solid ${theme.palette.secondary.main}`,
      padding: "12px 16px",
      borderRadius: "4px",
      margin: "4px 0",
      outline: "none",
      [theme.breakpoints.down("xs")]: {
        padding: "14px 16px",
      },
    },
  },
  buttonBack: {
    width: "50px",
    marginLeft: "4rem",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
}));

function SignUp() {
  const classes = useStyles();

  const [input, setInput] = React.useState({
    fullname: "",
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
      const usernameExists = await dispatch(
        checkUsernameExists(input.username)
      );
      if (usernameExists) {
        setSubmitting(false);
        setInput({
          ...input,
          password: "",
        });
        setError("Username taken. Please try another.");
      } else {
        const newUser = await auth.createUserWithEmailAndPassword(
          input.email,
          input.password
        );

        await newUser.user.updateProfile({
          displayName: input.fullname,
        });

        await dispatch(
          saveUserToDb(
            newUser.user.uid,
            input.fullname,
            input.email,
            input.username,
            newUser.user.photoURL,
            newUser.user.refreshToken
          )
        );

        history.push(`/${newUser.user.uid}/dashboard`);
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
      <IconButton
        className={classes.buttonBack}
        onClick={() => history.goBack()}
      >
        <ArrowBackSharp />
      </IconButton>
      <div className={classes.signUpCard}>
        <h1>Sign Up</h1>
        <p>Lorem ipsum dolor sit amet</p>

        <form autoComplete="off">
          <input
            type="text"
            name="fullname"
            placeholder="Fullname"
            aria-label="Fullname"
            value={input.fullname}
            onChange={({ target }) =>
              setInput({ ...input, [target.name]: target.value })
            }
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            aria-label="Username"
            value={input.username}
            onChange={({ target }) =>
              setInput({ ...input, [target.name]: target.value })
            }
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            value={input.email}
            onChange={({ target }) =>
              setInput({ ...input, [target.name]: target.value })
            }
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            aria-label="Password"
            value={input.password}
            onChange={({ target }) =>
              setInput({ ...input, [target.name]: target.value })
            }
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
