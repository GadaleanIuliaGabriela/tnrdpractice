import React from 'react';
import ProductService from "../api/Product";
import {Box, Card, Theme, Typography, withStyles, WithStyles} from "@material-ui/core";

const styles = (theme: Theme) => ({
  product: {
    width: '100%',
    marginBottom: '20px'
  },
  productCard: {
    padding: '20px'
  },
  productDescription: {
    paddingBottom: '5px'
  }
});

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string
}

interface MyProductsProps extends WithStyles<typeof styles> {
}

interface MyProductsState {
  products?: Product[];
  errorMessage?: string;
}

class MyProductsComponent extends React.Component<MyProductsProps, MyProductsState> {
  constructor(props: MyProductsProps) {
    super(props);
    this.state = {
      errorMessage: ''
    };
  }

  async componentDidMount() {
    const products = await ProductService.myProducts();
    if(products) {
      this.setState({products: products, errorMessage: undefined});
    } else {
      this.setState({errorMessage: "Something went wrong.", products: undefined});
    }
  }

  render() {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <div>
          {this.state.errorMessage && (
            <p className="error">Something went wrong. Please try again later.</p>
          )}

          {this.state.products && this.state.products.map(product => {
            return (
              <Box
                sx={{width: "60vw"}}
                m={2}
                key={product.id}
              >
                <Card variant="outlined" className={this.props.classes.productCard}>
                  <Typography variant="h5" component="h3">
                    {product.title.toUpperCase()}
                  </Typography>
                  <Typography color="textSecondary" className={this.props.classes.productDescription}>
                    PRICE: {product.price}{product.currency}
                  </Typography>
                  <Typography variant="body2">
                    {product.description}
                  </Typography>
                </Card>
              </Box>
            )
          })}
        </div>
      </Box>
    )
  }
}

export default withStyles(styles)(MyProductsComponent);
