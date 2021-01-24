import React from "react";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <ul>
      <h1>_KNJIGA.</h1>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/browse">Browse</Link>
      </li>
      <li>
        <Link to="/bookclub">Book Club</Link>
      </li>
      <li>
        <Link to="/myshelves">Shelves</Link>
      </li>
    </ul>
  );
}
export default Navigation;
