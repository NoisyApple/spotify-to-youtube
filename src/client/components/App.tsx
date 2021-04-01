import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Authorize from "./Authorize";
import Home from "./Home";
import Storage from "./Storage";

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/storage">
          <Storage />
        </Route>
        <Route path="/">
          <Authorize />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
