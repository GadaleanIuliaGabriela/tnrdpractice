import React, {useRef, useState} from 'react'
import {Grid, TextField, Button, makeStyles, createStyles, Theme} from '@material-ui/core'
import {Formik, Form, FormikProps} from 'formik'
import * as Yup from 'yup'
import {useHistory} from "react-router-dom";
import AuthService from "../api/Auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      '& > *': {
        width: '100%',
      },
    },
    submitButton: {
      marginTop: '24px',
    },
    title: {textAlign: 'center'},
    errorMessage: {color: 'red', textAlign: 'center'},
  })
)

interface LoginProps {
  handler: () => void
}

interface ILoginForm {
  email: string
  password: string
}

interface IFormStatus {
  message: string
  type: string
}

const LoginComponent: React.FunctionComponent<LoginProps> = (props: LoginProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const [formStatus, setFormStatus] = useState<IFormStatus>({message: '', type: ''})
  const [displayFormStatus, setDisplayFormStatus] = useState(false)

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const login = async (data: ILoginForm) => {
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    AuthService.login(email, password).then(
      () => {
        history.push("/user");
        props.handler()
      },
      error => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setFormStatus({message: resMessage, type: 'error'})
        setDisplayFormStatus(true)
      }
    );
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={async (values: ILoginForm) => {
          await login(values)
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Please enter the username'),
          password: Yup.string().required('Please enter the password')
        })}
      >
        {(props: FormikProps<ILoginForm>) => {
          const {values, touched, errors, handleBlur, handleChange, isSubmitting} = props
          return (
            <Form>
              <h1 className={classes.title}>Login</h1>
              {
                displayFormStatus && (
                  <div className="formStatus">
                    {formStatus.type === 'error' ?
                      <p className={classes.errorMessage}>{formStatus.message}</p> : null}
                  </div>
                )}
              <Grid
                container
                justifyContent="space-around"
                direction="row"
              >
                <Grid item md={10} className={classes.textField}>
                  <TextField
                    name="email"
                    id="email"
                    label="Email"
                    value={values.email}
                    type="text"
                    helperText={errors.email && touched.email ? errors.email : 'Enter the username.'}
                    error={!!(errors.email && touched.email)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputRef={emailInputRef}
                  />
                </Grid>
                <Grid item md={10} className={classes.textField}>
                  <TextField
                    name="password"
                    id="password"
                    label="Password"
                    value={values.password}
                    type="password"
                    helperText={errors.password && touched.password ? errors.password : 'Enter the password.'}
                    error={!!(errors.password && touched.password)}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputRef={passwordInputRef}
                  />
                </Grid>
                <Grid item md={10} className={classes.submitButton}>
                  <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

export default LoginComponent
