import React from "react";
import "./Sidebar.css";
import { useSelector, useDispatch } from "react-redux";
import { ImCross } from "react-icons/im";
import { hideSidebar } from "../actions/sidebar";
import {Link} from "react-router-dom";

function Sidebar() {
    const sidebar = useSelector((state) => state.sidebar)
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(hideSidebar())
    }
    return(
        <div className="sidebar" id={ sidebar ? "show-sidebar" : "hide-sidebar" }>
            <ul className="sidebar__links">
            <li className="navbar__link"><Link to='/Reg'>Reg</Link></li>
          <li className="navbar__link"><Link to='/Questions'>Questions</Link></li>
          <li className="navbar__link"><Link to='/Answers'>Answers</Link></li>
          <li className="navbar__link"><Link to='/Test'>TEST</Link></li>
            </ul>
            <div className="sidebar__cancel">
                <ImCross onClick={ () => handleClick() } />
            </div>
        </div>
    )
}

export default Sidebar;
