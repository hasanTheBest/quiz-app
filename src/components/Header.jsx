import classNames from "classnames";
import { Link, useLocation, useParams } from "react-router-dom";

export const Header = () => {

const location = useLocation();

  return(  <header>
    <nav className="navbar">
      <Link to="/" className={ `link menu ${location.pathname === "/" ? "active" : ""}`}>
        Home
      </Link>
      <Link to="/result" className={`link menu ${location.pathname === "/result" ? "active" : ""}`}>
        Result
      </Link>
      <Link to="/about" className={`link menu ${location.pathname === "/about" ? "active" : ""}`}>
        About
      </Link>
    </nav>
  </header>)
};