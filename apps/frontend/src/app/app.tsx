import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {RouteComponentProps} from 'react-router';
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {ActivationComponent} from "./components/ActivationComponent";
import LoginComponent from "./components/LoginComponent";
import HeaderComponent from "./components/HeaderComponent";
import {AccountComponent} from "./components/AccountComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import {LogoutComponent} from "./components/LogoutComponent";
import RegisterComponent from "./components/RegisterComponent";
import AddProductComponent from "./components/AddProductComponent";
import MyProductsComponent from "./components/MyProductsComponent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      minHeight: `calc(100vh - 70px)`,
      background: theme.palette.background.paper,
      marginLeft: theme.spacing(7),
      marginRight: theme.spacing(7)
    }
  })
);

export function App() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  const handleLogout = () => {
    setIsLoggedIn(false);
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <div className={classes.root}>
      <Router>
        <HeaderComponent title={"Welcome"} isLoggedIn={isLoggedIn}/>
        <div className={classes.content}>
          <Switch>
            <Route
              exact
              path='/activate/:token'
              component={ActivationComponent}
            />
            <Route
              exact
              path='/login'
              component={(props: RouteComponentProps) => <LoginComponent handler={handleLogin} {...props}/>}
            />
            <Route
              exact
              path='/logout'
              component={(props: RouteComponentProps) => <LogoutComponent handler={handleLogout} {...props}/>}
            />
            <Route
              exact
              path='/register'
              component={RegisterComponent}
            />
            <Route
              exact
              path='/add-product'
              component={AddProductComponent}
            />
            <Route
              exact
              path='/my-products'
              component={MyProductsComponent}
            />
            <ProtectedRoute exact path={`/user`} component={AccountComponent}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
