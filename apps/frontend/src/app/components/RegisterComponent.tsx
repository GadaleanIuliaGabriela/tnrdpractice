import React, {useRef, useState} from 'react';
import {Button, TextField, Theme, withStyles, WithStyles, Grid, Box} from "@material-ui/core";
import AuthService from "../api/Auth";

interface RegisterProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => ({
  login: {
    borderStyle: 'solid',
    width: '50%',
    borderRadius: '5px',
    borderWidth: '2px',
  },
  formField: {
    paddingTop: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    margin: '5px'
  },
  submitButton: {
    paddingTop: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    margin: '5px',
    paddingBottom: '30px'
  },
  error: {
    paddingTop: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    margin: '5px',
    color: 'red'
  }
});

const RegisterComponent: React.FC<RegisterProps> = (props: RegisterProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    AuthService.register(email, password).then(
      () => {
        setRegistered(true);
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setErrorMessage(resMessage);
      }
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {registered ?
        <div>User registered! Please check your email!</div> :
        <form onSubmit={submitHandler} className={props.classes.login}>
          {
            errorMessage &&
            <div className={props.classes.error}>
              {errorMessage}
            </div>
          }
          <div className={props.classes.formField}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              autoComplete="none"
              inputRef={emailInputRef}
            />
          </div>
          <div className={props.classes.formField}>
            <TextField
              name="password"
              label="Password"
              fullWidth
              type="password"
              autoComplete="none"
              inputRef={passwordInputRef}
            />
          </div>
          <div className={props.classes.submitButton}>
            <Button variant="contained" type="submit" fullWidth>
              Register
            </Button>
          </div>
        </form>
      }
    </Box>
  )
}

export default withStyles(styles)(RegisterComponent);
