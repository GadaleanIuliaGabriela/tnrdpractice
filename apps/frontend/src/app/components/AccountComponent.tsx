import React from "react";
import AuthService from "../api/Auth";
import {Link} from "react-router-dom";

interface AccountState {
  email: string
}

interface AccountProps {}

export class AccountComponent extends React.Component<AccountProps, AccountState> {
  constructor(props: AccountProps) {
    super(props);
    this.state = {
      email: ''
    }
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({email: user.email})
    }
  }

  render() {
    return (
      <div>
        <p>Welcome { this.state.email }</p>
        <Link to="/add-product">
          Add product
        </Link>
      </div>
    )
  }
}
