import React from 'react';
import "./nav.scss";

import logo from '../../resources/logo.png';

class Nav extends React.Component {

  render() {
    return (
      <div
        className="barParent"
        style={{
          display: "flex",
          alignItems: 'center',
          background: 'linear-gradient( rgb(43, 136, 4),rgb(66, 149, 31))',
        }}>
        <img src={logo} alt="logo" />
        <h1 style={{
          color: 'white'
        }}>

        </h1>
      </div>
    );
  }
}
export default Nav;
