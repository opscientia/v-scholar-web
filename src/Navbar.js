import React from 'react';
import Login from './LogIn';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div>
            <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">vScholar</a>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="#" className="nav-link" onClick={() => props.setUpload(false)}>Home</Link>
                </li>
                <li className="nav-item">
                <Link to="#" className="nav-link" onClick={() => props.setUpload(false)}>Recent Papers</Link>
                </li>
                <li className="nav-item">
                  <Link to="#" className="nav-link" onClick={() => props.setUpload(false)}>Mission</Link> 
                </li>
                {
                  props.logInStatus ? 
                  (
                    <li className="nav-item">
                      <Link to="#" className="nav-link" onClick={() => props.setUpload(true)}>Upload</Link> 
                      {/* <a className="nav-link" href="#">Upload</a> */}
                    </li>
                  ) : null
                }
                {
                  props.logInStatus ? 
                  (
                    <li className="nav-item">
                      <Link to="#" className="nav-link" onClick={() => props.setUpload(false)}>My Papers</Link>
                    </li>
                  ) : null
                }
              </ul>
            </div>
          </div>
          <form className="sign-in">
              <Login setLogInStatus={props.setLogInStatus}/>
          </form>
        </nav>
      </div>

      
  
      
        </div>
    )
}

export default Navbar;


