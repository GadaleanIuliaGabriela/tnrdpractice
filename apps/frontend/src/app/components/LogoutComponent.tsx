import React from "react";
import AuthService from "../api/Auth";
import {Redirect} from "react-router";

interface LogoutState {}

interface LogoutProps {}

export class LogoutComponent extends React.Component<LogoutState, LogoutProps> {
  constructor(props: LogoutProps) {
    super(props);
  }

  componentDidMount() {
    AuthService.logout();
  }

  render() {
    return <Redirect to={'/'} />
  }
}
