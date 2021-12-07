import React, {useRef, useState} from 'react'
import {Grid, TextField, Button, makeStyles, createStyles, Theme} from '@material-ui/core'
import {Formik, Form, FormikProps} from 'formik'
import * as Yup from 'yup'
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

interface IRegisterForm {
  email: string
  password: string
}

interface IFormStatus {
  message: string
  type: string
}

const RegisterComponent: React.FunctionComponent = () => {
  const classes = useStyles();

  const [formStatus, setFormStatus] = useState<IFormStatus>({message: '', type: ''})
  const [displayFormStatus, setDisplayFormStatus] = useState(false)
  const [registered, setRegistered] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const register = async (data: IRegisterForm) => {
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    AuthService.register(email, password).then(
      () => {
        setRegistered(true);
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
      {registered ?
        <div>User registered! Please check your email!</div> :
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={async (values: IRegisterForm) => {
            await register(values)
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required('Please enter the username'),
            password: Yup.string().required('Please enter the password').test(
              'len',
              'Mush have at least 8 characters',
              function (value) {
                if (value) {
                  return value.length >= 8;
                }
                return false;
              })
          })}
        >
          {(props: FormikProps<IRegisterForm>) => {
            const {values, touched, errors, handleBlur, handleChange, isSubmitting} = props
            return (
              <Form>
                <h1 className={classes.title}>Register</h1>
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
      }
    </div>
  )
}

export default RegisterComponent
