import React from "react";
import AuthService from "../api/Auth";

interface AccountState {
  email: string
}

interface AccountProps {

}

export class AccountComponent extends React.Component<AccountProps, AccountState> {
  constructor(props: AccountProps) {
    super(props);
    this.state = {
      email: ''
    }
  }

  componentDidMount() {
    const email = AuthService.getCurrentUser();
    if (email) {
      this.setState({email: email})
    }
  }

  render() {
    return (
      <div>
        <p>Welcome { this.state.email }</p>
      </div>
    )
  }
}
