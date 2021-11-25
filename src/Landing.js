import React from 'react'
import createAccount from './utils/account'

const Landing = () => {
    return (
        <div>
            <div class="container-fluid">
      <div class="top-container">
          <h2>A Digital Permanent Library for Scholarly Articles</h2>
          <p class="landing">Scholarly contents uploaded on our platform can never be lost and are secured permanently by decentralized storage technology on Arweave</p>
          <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search by subject, author, keyword ...." aria-label="Search" />
              <button onClick = { () => createAccount()} class="btn btn-outline-success" type="submit">Search</button>
            </form>
      </div>
            
  
      </div>
        </div>
    )
}

export default Landing
