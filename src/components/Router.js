import React from "react";

import { Switch, Route } from "react-router-dom";
import Todo from "./Todo/Todo";
import StarWars from "./StarWars/StarWars";

const Router = () => (
  <Switch>
    <Route path="/" exact>
      <Todo />
    </Route>
    <Route path="/star-wars" exact>
      <StarWars />
    </Route>
  </Switch>
);

export default Router;
