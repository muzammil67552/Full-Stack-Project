/* eslint-disable react/no-unknown-property */

import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">MERN</a>
      <button className="navbar-toggler" type="button">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link active" >Create Post</Link>
          </li>
          <li className="nav-item">
            <Link to="/all" className="nav-link active" >All Post</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
