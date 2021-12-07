import React, {useRef, useState} from 'react'
import {Grid, TextField, Button, makeStyles, createStyles, Theme, MenuItem} from '@material-ui/core'
import {Formik, Form, FormikProps} from 'formik'
import * as Yup from 'yup'
import ProductService from "../api/Product";
import {useHistory} from "react-router-dom";

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

interface ICreateProductForm {
  title: string
  description: string
  price: number
  currency: string
}

interface IFormStatus {
  message: string
  type: string
}

interface IFormStatusProps {
  [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error'
  }
}

interface CurrenciesOptions {
  value: string;
  label: string;
}

const currencies: CurrenciesOptions[] = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'RON',
    label: 'RON',
  },
];

const AddProductComponent: React.FunctionComponent = () => {
  const classes = useStyles();
  const history = useHistory();

  const [formStatus, setFormStatus] = useState<IFormStatus>({message: '', type: ''})
  const [displayFormStatus, setDisplayFormStatus] = useState(false)

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const currencyInputRef = useRef<HTMLInputElement>(null);

  const createNewProduct = async (data: ICreateProductForm) => {
    const title = titleInputRef.current!.value;
    const description = descriptionInputRef.current!.value;
    const price = priceInputRef.current!.value;
    const currency = currencyInputRef.current!.value;

    ProductService.add(title, +price, currency, description).then(() => {
        history.push("/user");
      },
      error => {
        setFormStatus(formStatusProps.error)
        setDisplayFormStatus(true)
      }
    );
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          title: '',
          description: '',
          price: 0.01,
          currency: 'EUR',
        }}
        onSubmit={async (values: ICreateProductForm) => {
          await createNewProduct(values)
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Please enter a title for the product'),
          price: Yup.number().min(0.01).required('Please enter a price for the product'),
          currency: Yup.string().required().test(
            'valid-currency',
            'Currency must be EUR, USD or RON',
            function (value) {
              if (value) return ['EUR', 'USD', 'RON'].includes(value)
              return false
            }
          )
        })}
      >
        {(props: FormikProps<ICreateProductForm>) => {
          const {values, touched, errors, handleBlur, handleChange, isSubmitting} = props
          return (
            <Form>
              <h1 className={classes.title}>Create Product</h1>
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
                    name="title"
                    id="title"
                    label="Title"
                    value={values.title}
                    type="text"
                    helperText={errors.title && touched.title ? errors.title : 'Enter the product name.'}
                    error={!!(errors.title && touched.title)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputRef={titleInputRef}
                  />
                </Grid>
                <Grid item md={10} className={classes.textField}>
                  <TextField
                    name="description"
                    id="description"
                    label="Description"
                    value={values.description}
                    helperText={'Enter the product description.'}
                    error={!!(errors.description && touched.description)}
                    multiline
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputRef={descriptionInputRef}
                  />
                </Grid>
                <Grid item md={10} className={classes.textField}>
                  <TextField
                    name="price"
                    id="price"
                    label="Price"
                    value={values.price}
                    helperText={errors.price && touched.price ? errors.price : 'Please enter a valid price'}
                    error={!!(errors.price && touched.price)}
                    multiline
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputRef={priceInputRef}
                  />
                </Grid>
                <Grid item md={10} className={classes.textField}>
                  <TextField
                    name="currency"
                    id="currency"
                    label="Currency"
                    helperText={errors.currency && touched.currency ? errors.currency : 'Please select the currency'}
                    fullWidth
                    select
                    value={values.currency}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputRef={currencyInputRef}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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

export default AddProductComponent
