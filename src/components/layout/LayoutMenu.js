import React from 'react';
import Sidebar from "../sidebar/SidebarMenu";
import "./layout.scss";
import Nav from "../header/Nav";

function LayoutMenu(props) {

  return (
    <div className="view">
      <div className="mainWrapper">
        <Sidebar className="sideBar"
          history={props.history} />

        <div className="sidebarMargin">
          <div className="SideMarginHeader">
            <div className="Header">
              <Nav />
            </div>
          </div>
          <div className="SideMarginChild">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LayoutMenu;

