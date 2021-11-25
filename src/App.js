import React, { useEffect, useState, Component} from "react";
import LogIn from "./LogIn";
import Entry from "./LogIn";
import SignedInPage from "./SignInPage";
import SignUp from "./SignUp";
import ArweaveKey from "./ArweaveKey";
import Navbar from "./Navbar";
import Landing from "./Landing";
import MiddleContainer from "./MiddleContainer";
import Footer from "./footer";
import Auth from "./auth/logInWallet";
import UploaderPage from "./Upload";
import arweave_config from "./arweave-config";
import Arweave from "arweave";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';



function App() {

  const [logInStatus, setLogInStatus] = useState(false)
  const [isUpload, setUpload] = useState(false)
    const ArweaveInstance = Arweave.init(arweave_config);

  return (
    <div>
      <Navbar setLogInStatus={setLogInStatus} logInStatus={logInStatus} setUpload={setUpload}/>
      {
        isUpload ? (
          <div>
            < Auth />
            <UploaderPage />
          </div>
        ) : (<div>
          <Landing />
          <MiddleContainer />
        </div>)
      } 
    <Footer />
    </div>
  );
}


// export {ArweaveInstance}

export default App;
