import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {ActivationComponent} from "./components/ActivationComponent";
import LoginComponent from "./components/LoginComponent";
import HeaderComponent from "./components/HeaderComponent";
import {AccountComponent} from "./components/AccountComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import {LogoutComponent} from "./components/LogoutComponent";
import RegisterComponent from "./components/RegisterComponent";
import AddProductComponent from "./components/AddProductComponent";

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
  return (
    <div className={classes.root}>
      <Router>
        <HeaderComponent title={"Welcome"}/>
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
              component={LoginComponent}
            />
            <Route
              exact
              path='/logout'
              component={LogoutComponent}
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
            <ProtectedRoute exact path={`/user`} component={AccountComponent}/>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
