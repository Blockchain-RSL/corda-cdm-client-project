import React from 'react';
import "./nav.scss";

import logo from '../../resources/logo.png';

class Nav extends React.Component {

  render() {
    return (
      <div className="barParent">
        <img src={logo} alt="logo" />
      </div>
    );
  }
}
export default Nav;
