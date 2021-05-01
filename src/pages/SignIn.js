import { Divider, IconButton, makeStyles } from "@material-ui/core";
import React from "react";
import ButtonSubmitting from "../components/ButtonSubmitting";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constant/routes";
import { auth, googleProvider } from "../firebase";
import { ArrowBackSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  signInRoot: {
    width: "100%",
    background: theme.palette.primary.main,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
  signInCard: {
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
    },

    "& >h1,p": {
      textAlign: "center",
    },

    "& >p": {
      margin: "1rem 0",
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

  googleSignIn: {
    height: "40px",
    display: "flex",
    border: `1.8px solid ${theme.palette.secondary.main}`,
    padding: "4px 16px",
    justifyContent: "center",
    margin: "2rem 0",
    borderRadius: "4px",
    cursor: "pointer",

    "& >img": {
      height: "100%",
    },

    "& >button": {
      margin: "0 10px",
      background: "transparent",
      border: 0,
      color: "#fff",
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "1.8rem 0",
    "& hr": {
      flex: 1,
    },

    "& >p": {
      margin: "0 10px",
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

function SignIn() {
  const classes = useStyles();

  const [input, setInput] = React.useState({ email: "", password: "" });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const history = useHistory();

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((data) => {
        if (data.user) {
          history.push(`/${data.user.uid}/dashboard`);
        }
      })
      .catch((err) => console.log(err));
  };

  const setSignIn = (e) => {
    e.preventDefault();
    setSubmitting(true);
    auth
      .signInWithEmailAndPassword(input.email, input.password)
      .then((data) => {
        setSubmitting(false);
        history.push(`/${data.user.uid}/dashboard`);
      })
      .catch((err) => {
        setSubmitting(false);
        setError(err.message);
      });

    setInput({
      ...input,
      password: "",
    });
  };

  return (
    <div className={classes.signInRoot}>
      <IconButton
        className={classes.buttonBack}
        onClick={() => history.goBack()}
      >
        <ArrowBackSharp />
      </IconButton>
      <div className={classes.signInCard}>
        <h1>Sign In</h1>
        <p>Lorem ipsum dolor sit amet</p>
        <div className={classes.googleSignIn}>
          <img src="/images/google-logo.png" alt="icon-google-signin" />
          <button type="button" onClick={signInWithGoogle}>
            SignIn with Google
          </button>
        </div>

        <div className={classes.divider}>
          <Divider />
          <p>or</p>
          <Divider />
        </div>
        <form autoComplete="off">
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
            submit={setSignIn}
            disabled={input.email === "" || input.password === ""}
            btnText="Sign in"
          />
        </form>
        {error && <p className="error"> {error}</p>}
        <p>
          Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
