import { Divider, makeStyles } from "@material-ui/core";
import React from "react";
import ButtonSubmitting from "../components/ButtonSubmitting";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constant/routes";
import {
  auth,
  checkUsernameExists,
  googleProvider,
  saveUser,
} from "../firebase";

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

  const [input, setInput] = React.useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
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

  const setSignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const usernameExists = await checkUsernameExists(input.username);
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

        await saveUser(input.fullname, input.email, input.username);

        history.push(`/dashboard/${newUser.user.id}`);
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
    <div className={classes.signInRoot}>
      <h1>LetsNote</h1>
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
  );
}

export default SignIn;
