import React, {ReactElement, FC} from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {Link} from "react-router-dom";
import {createStyles, Theme} from "@material-ui/core/styles";

interface Props {
  title: String
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navlinks: {
      marginLeft: theme.spacing(10),
      display: "flex",
    },
    logo: {
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "15px",
      marginLeft: theme.spacing(5),
      "&:hover": {
        borderBottom: "1px solid white",
      },
    }
  })
);

const HeaderComponent: FC<Props> = ({title}): ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <CssBaseline/>
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            {title}
          </Typography>
          <div className={classes.navlinks}>
            <Link to="/user" className={classes.link}>
              User
            </Link>
            <Link to="/login" className={classes.link}>
              Login
            </Link>
            <Link to="/logout" className={classes.link}>
              Logout
            </Link>
            <Link to="/register" className={classes.link}>
              Register
            </Link>
            <Link to="/add-product" className={classes.link}>
              Add product
            </Link>
            <Link to="/my-products" className={classes.link}>
              My products
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HeaderComponent;
