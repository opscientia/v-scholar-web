import React from "react";

function SignedInPage() {
    return (<div>

        <div class="container-fluid">
      <nav class="navbar navbar-expand-lg navbar-dark">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">vScholar</a>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Recent Papers</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Mission</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">News</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Upload Papers</a>
                </li>
              </ul>
            </div>
          </div>
          <form class="sign-in">
              <button class="btn btn-outline-success" type="submit">Sign In</button>
          </form>
        </nav>
      </div>
       <div class="container-fluid">
      <div class="top-container">
          <h2>A Digital Permanent Library for Scholarly Articles</h2>
          <p class="landing">Scholarly contents uploaded on our platform can never be lost and are secured permanently by decentralized storage technology on Arweave</p>
          <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search by subject, author, keyword ...." aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
      </div>
      </div>

            
  
    </div>)
}
export default SignedInPage;