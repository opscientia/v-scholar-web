import React, { Component } from 'react';
import arweave from '../arweave-config';


class Auth extends Component {
  state = {
    isAuthenticated: null,
    contentToggled: false,
    contentStyle: null,
    balance: 0,
    wallet_address: undefined
  }

  constructor(props) {
    super(props);

    this.toggleContent.bind(this);
    this.explandContentArea.bind(this);
  }

  toggleContent() {
    if(this.state.contentToggled) {
      this.setState({contentToggled: false, contentStyle: null});
    } else {
      this.setState({contentToggled: true, contentStyle: {marginLeft: '0px'}});
    }
  }

  explandContentArea() {
    this.setState({contentToggled: true, contentStyle: {marginLeft: '0px'}});
  }

  componentDidMount() {
    const wallet_address = sessionStorage.getItem('AR_Wallet', null);
    const jwk = JSON.parse(sessionStorage.getItem('AR_jwk', null));  
    
    if(jwk !== null) {
      this.setState({isAuthenticated: true, wallet_address: wallet_address, jwk: jwk});
      this.loadWallet(wallet_address);
    }

    const isAuthenticated = sessionStorage.getItem('isAuthenticated');

    this.setState({isAuthenticated: isAuthenticated === 'true' ? true : false});
  }

  componentDidUpdate(prevProps) {
    if(this.props.isAuthenticated !== undefined && this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.setState({isAuthenticated: this.props.isAuthenticated});

      if(this.props.isAuthenticated && !this.props.expand_content_area) {
        this.setState({contentStyle: {marginLeft: '0px'}});
      }
    }
  }

  loadWallet(wallet_address) {
    const that = this;

    if(wallet_address) {
        arweave.wallets.getBalance(wallet_address).then((balance) => {
            let ar = arweave.ar.winstonToAr(balance);

            const state = {balance: ar};

            that.setState(state);
        });   
    }     
  }

  connectToWallet = async() => {
    await window.arweaveWallet.connect(["ACCESS_ADDRESS", "SIGN_TRANSACTION", "ACCESS_PUBLIC_KEY"])

     const address = await window.arweaveWallet.getActiveAddress()
     console.log(address);
    this.setState({...this.state, wallet_address: address})
    console.log(this.state);
   }


  setWalletAddress(wallet_address_files) {
      const that = this;

      const reader = new FileReader();
      reader.onload = function() {
          const text = reader.result;
          const jwk = JSON.parse(text);

          arweave.wallets.jwkToAddress(jwk).then((wallet_address) => {                
              that.setState({wallet_address: wallet_address, jwk: jwk});
              sessionStorage.setItem('AR_Wallet', wallet_address);
              sessionStorage.setItem('AR_jwk', JSON.stringify(jwk));
          
              that.loadWallet(wallet_address);

              that.setState({isAuthenticated: true});
              sessionStorage.setItem('isAuthenticated', true);

              that.addSuccessAlert("You have successfully connected.");
          });
          
      }
      reader.readAsText(wallet_address_files[0]);

  }

//   addSuccessAlert(message)  {
//     toast(message, { type: toast.TYPE.SUCCESS });     
//   }

//   addErrorAlert(message) {
//     toast(message, { type: toast.TYPE.ERROR });  
//   }

  disconnectWallet() {
      sessionStorage.removeItem('AR_Wallet');
      sessionStorage.removeItem('AR_jwk');
      sessionStorage.removeItem('isAuthenticated');
      this.setState({isAuthenticated: false, wallet_address: null, jwk: null, balance: 0});

      this.addSuccessAlert("Your wallet is now disconnected");
  }

  componentWillMount(){
   // return (this.props.explandContentArea());
  }

  

  inputChangedHandler(event, inputIdentifier) {
    const updatedLoginForm = {
      ...this.state.LoginForm,
      [inputIdentifier]: {
        ...this.state.LoginForm[inputIdentifier],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.LoginForm[inputIdentifier].validation),
        touched: true
      }
    }

    this.setState({LoginForm: updatedLoginForm});
  }

  LoginHandler(event) {
    event.preventDefault();

    this.props.onAuth(this.state.LoginForm.email.value, this.state.LoginForm.password.value);
  }

  onChange(event) {
    const wallet_address_files = event.target.files;
    // this.setState({wallet_address: wallet_address});
    
    //this.props.setWalletAddress(wallet_address_files);
  }   

  render() {
    const {wallet_address} = this.state
    console.log(wallet_address);



    return (
      <div className="padding-15">

			<div className="login-box">


				{/* <form className="sky-form boxed"> */}
					<header><i className="fa fa-cloud-download"></i>  Connect Your AR Wallet</header>
                    
                    
					{/* <fieldset> */}
                        {/* <section>Please select your <strong>AR wallet</strong> to start uploading papers!</section> */}
                        {wallet_address ? <p>{wallet_address}</p> :<button onClick={() => this.connectToWallet()}>Connect</button>}
					{/* </fieldset> */}

					<footer>
						<div className="forgot-password pull-left">
                             <a href="https://tokens.arweave.org/" target="_blank">Need some AR tokens?</a>
                        </div>
					</footer>
				{/* </form> */}


			</div>

		</div>
    );
  }
}


export default Auth;