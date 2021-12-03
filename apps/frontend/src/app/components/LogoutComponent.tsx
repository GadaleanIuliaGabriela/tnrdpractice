import React from "react";
import AuthService from "../api/Auth";
import {Redirect} from "react-router";

interface LogoutState {}

interface LogoutProps {
  handler: () => void
}

export class LogoutComponent extends React.Component<any, any> {
  constructor(props: LogoutProps) {
    super(props);
  }

  componentDidMount() {
    AuthService.logout();
    this.props.handler()
  }

  render() {
    return <Redirect to={'/'} />
  }
}
