import React, { Component } from 'react';
import { toast } from 'react-toastify';

class Logout extends Component {
  componentWillMount() {
    toast("You have successfully disconnected your wallet.", { type: toast.TYPE.SUCCESS });
    alert(this.props.onLogout);
    
    this.props.onLogout();
    this.props.explandContentArea();
      
  }

  // render() {
  //   return <Redirect to="/login" />;
  // }
};

export default Logout;