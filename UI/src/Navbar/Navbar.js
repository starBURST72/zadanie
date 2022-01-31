import React from "react";
import './Navbar.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { showSidebar } from "../actions/sidebar";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(showSidebar());
  };
  return (
    <div className="navbar">
      <div className="navbar__wrapper">
        <div className="navbar__logo">

          <h1>Тест</h1>
        </div>
        <ul className="navbar__links">
          <li className="navbar__link"><Link to='/Reg'>Reg</Link></li>
          <li className="navbar__link"><Link to='/Questions'>Questions</Link></li>
          <li className="navbar__link"><Link to='/Answers'>Answers</Link></li>
          <li className="navbar__link"><Link to='/Test'>TEST</Link></li>
        </ul>
        <GiHamburgerMenu
          onClick={() => handleClick()}
          className="navbar__burger"
        />
      </div>
    </div>
  );
}

export default Navbar;
