import React, {useRef} from 'react';
import {Button, TextField, Theme, withStyles, WithStyles, Grid, Box} from "@material-ui/core";
import AuthService from "../api/Auth";
import { useHistory } from "react-router-dom";

interface LoginProps extends WithStyles<typeof styles> {
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
  }
});

const LoginComponent: React.FC<LoginProps> = (props: LoginProps): JSX.Element => {
  const history = useHistory();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    AuthService.login(email, password).then(
      () => {
        history.push("/user");
      },
      error => {
        console.log(error)
      }
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <form onSubmit={submitHandler} className={props.classes.login}>
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
            autoComplete="none"
            inputRef={passwordInputRef}
          />
        </div>
        <div className={props.classes.submitButton}>
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </Box>
  )
}

export default withStyles(styles)(LoginComponent);
