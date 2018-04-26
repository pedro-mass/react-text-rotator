import React, { Component } from "react";

import Rotator from "./rotator";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    const words = ["trainer", "dietician", "activity expert", "sleep coach"];

    return <Rotator words={words} />;
  }
}

export default App;
