import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (<nav className="navbar navbar-expand-sm navbar-dark bg-info mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">DirectedBy</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Membres</Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/register">S'inscrire</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Se connecter</Link>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search a member" aria-label="Search" />
          <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
          </form> */}
        </div>
      </div>
    </nav>)
  }
}

export default Navbar;
