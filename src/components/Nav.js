import React from "react";

import { Link } from "react-router-dom";

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">Todo</Link>
      </li>
      <li>
        <Link to="/star-wars">StarWars</Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
