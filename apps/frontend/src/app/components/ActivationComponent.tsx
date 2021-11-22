import React from 'react';
import axios from 'axios';

type ActivationProps = {
  token: string
}

export class ActivationComponent extends React.Component<any, any> {
  constructor(props: ActivationProps) {
    super(props);
    console.log(props);
  }

  componentDidMount() {

    axios.get(`http://127.0.0.1:3001/api/auth/activate?token=${this.props.match.params.token}`).then(() => {
      console.log("data");
    })
  }

  render() {
    return <p>Your account is now active.</p>
  }

}
