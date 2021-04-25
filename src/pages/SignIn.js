import { Divider, makeStyles } from "@material-ui/core";
import React from "react";
import ButtonSubmitting from "../components/ButtonSubmitting";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constant/routes";
import { auth, googleProvider } from "../firebase";

const useStyles = makeStyles((theme) => ({
  signInRoot: {
    width: "440px",
    margin: "1rem auto",
    padding: "2rem 4rem",
    flex: 1,
    border: "1.5px solid #bdbdbd",
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
      border: "1.8px solid #b8b8b8",
      padding: "12px 16px",
      borderRadius: "8px",
      margin: "3px 0",
      outline: "none",
      [theme.breakpoints.down("xs")]: {
        padding: "14px 16px",
      },
    },
  },

  googleSignIn: {
    height: "40px",
    display: "flex",
    border: "1.8px solid #b8b8b8",
    padding: "4px 16px",
    justifyContent: "center",
    margin: "2rem 0",
    borderRadius: "8px",
    cursor: "pointer",

    "& >img": {
      height: "100%",
    },

    "& >button": {
      margin: "0 10px",
      background: "transparent",
      border: 0,
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
          history.push(`/dashoard/${data.user.uid}`);
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
        if (data.user) {
          history.push(`/dashoard/${data.user.uid}`);
        }
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
      <h1>LetsNote</h1>
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
  );
}

export default SignIn;
