import React, {useRef, useState} from 'react';
import {Button, TextField, Theme, withStyles, WithStyles, Grid, Box, MenuItem} from "@material-ui/core";
import ProductService from "../api/Product";
import {useHistory} from "react-router-dom";

interface AddProductProps extends WithStyles<typeof styles> {
}

const styles = (theme: Theme) => ({
  addProduct: {
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

const AddProductComponent: React.FC<AddProductProps> = (props: AddProductProps): JSX.Element => {
  const history = useHistory();
  const [currency, setCurrency] = React.useState('EUR');
  const [errorMessage, setErrorMessage] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const currencyInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<{ value: string }>) => {
    setCurrency(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const title = titleInputRef.current!.value;
    const description = descriptionInputRef.current!.value;
    const price = priceInputRef.current!.value;
    const currency = currencyInputRef.current!.value;

    ProductService.add(title, +price, currency, description).then(
      () => {
        history.push("/user");
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
      <form onSubmit={submitHandler} className={props.classes.addProduct}>
        {
          errorMessage &&
          <div className={props.classes.error}>
            {errorMessage}
          </div>
        }
        <div className={props.classes.formField}>
          <TextField
            name="title"
            label="Title"
            helperText="Please enter product title"
            fullWidth
            autoComplete="none"
            inputRef={titleInputRef}
          />
        </div>
        <div className={props.classes.formField}>
          <TextField
            name="description"
            label="Description"
            helperText="Please enter product description"
            multiline
            fullWidth
            inputRef={descriptionInputRef}
          />
        </div>
        <div className={props.classes.formField}>
          <TextField
            name="price"
            label="Price"
            helperText="Please enter product price"
            fullWidth
            autoComplete="none"
            inputRef={priceInputRef}
          />
        </div>
        <div className={props.classes.formField}>
          <TextField
            name="currency"
            label="Currency"
            helperText="Please select product currency"
            fullWidth
            select
            value={currency}
            onChange={handleChange}
            inputRef={currencyInputRef}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={props.classes.submitButton}>
          <Button variant="contained" type="submit" fullWidth>
            Add
          </Button>
        </div>
      </form>
    </Box>
  )
}

export default withStyles(styles)(AddProductComponent);
