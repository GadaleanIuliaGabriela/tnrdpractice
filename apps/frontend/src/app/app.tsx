import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {makeStyles, createStyles, Theme} from "@material-ui/core/styles";
import {ActivationComponent} from "./components/ActivationComponent";
import LoginComponent from "./components/LoginComponent";
import HeaderComponent from "./components/HeaderComponent";
import {AccountComponent} from "./components/AccountComponent";
import ProtectedRoute from "./components/ProtectedRoute";

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
      minHeight: `calc(100vh - 30px)`,
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
      <HeaderComponent title={"Welcome"}/>
      <div className={classes.content}>
        <Router>
          <Switch>
            <Route
              path={`/activate/:token`}
              render={(props) => (
                <ActivationComponent {...props}/>
              )}
            />
            <Route
              path={`/login`}
              render={(props) => (
                <LoginComponent />
              )}
            />
            <ProtectedRoute exact path={`/user`} component={AccountComponent}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
