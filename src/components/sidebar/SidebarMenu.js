import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { Link } from "react-router-dom";
import SidebarItems from "../constants/SidebarItemsMenuConstants";

function Sidebar(props, { defaultActive, }) {
  const location = props.history.location;
  const lastActiveIndexString = localStorage.getItem("lastActiveIndex");
  const lastActiveIndex = Number(lastActiveIndexString);
  const [activeIndex, setActiveIndex] = useState(lastActiveIndex || defaultActive);

  function changeActiveIndex(newIndex) {
    localStorage.setItem("lastActiveIndex", newIndex)
    setActiveIndex(newIndex)
  }

  function getPath(path) {
    if (path.charAt(0) !== "/") {
      return "/" + path;
    }
    return path;
  }

  useEffect(() => {
    const activeItem = SidebarItems.findIndex(item => getPath(item.route) === getPath(location.pathname))
    changeActiveIndex(activeItem);
  }, [location])

  return (
    <SidebarParent>
      <div>
        {
          SidebarItems.map((item, index) => {
            return (
              <Link key={item.name} to={item.route}>
                <SidebarItem key={item.name}
                  active={index === activeIndex}
                >
                  <p>{item.name}</p>
                </SidebarItem>
              </Link>
            );
          })
        }
      </div>
      <div className="behind-the-scenes" />
    </SidebarParent>
  );
}

export default Sidebar;

const SidebarParent = styled.div`
  background: linear-gradient(rgb(43, 136, 4),transparent);
  shadowColor: '#000000';
  
  a {
    text-decoration: none;
  }
  
  & > div {
    width: 25vh;
  }
  
  .behind-the-scenes {
    width: 25vh;
  }
`;

const SidebarItem = styled.div`
  padding: 16px 24px;
  transition: all 0.25s ease-in-out;
  background: ${props => props.active ? "linear-gradient(rgb(1,192,35),transparent)" : ""};
  margin: 4px 12px;
  border-radius: 4px;

  p {
    color: white;
    font-weight: bold;
    text-decoration: none;
  }
  
  &:hover {
    cursor:pointer;
  }
  
  &:hover:not(:first-child) {
    background: #c34a36;
  }
`;
