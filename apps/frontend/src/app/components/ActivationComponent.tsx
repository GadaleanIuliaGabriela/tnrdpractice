import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import {Link} from "react-router-dom";
import AuthService from "../api/Auth";

interface MatchParams {
  token: string;
}

interface ActivationProps extends RouteComponentProps<MatchParams> {
}

interface ActivationState {
  success?: string;
  errorMessage?: string;
}

export class ActivationComponent extends React.Component<ActivationProps, ActivationState> {
  constructor(props: ActivationProps) {
    super(props);
    this.state = {
      success: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    AuthService.activateAccount(this.props.match.params.token).then(() => {
      this.setState({success: "Account activated!", errorMessage: undefined})
    }).catch(() => {
      this.setState({errorMessage: "Your account is already active.", success: undefined})
    })
  }

  render() {
    return (
      <div>
        { this.state.errorMessage &&
        <h3>{this.state.errorMessage}</h3> }
        { this.state.success &&
        <h3>{this.state.success}</h3> }
        <Link to="/login">Login here</Link>
      </div>
    )
  }

}
