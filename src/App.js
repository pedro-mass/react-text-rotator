import React, { Component } from "react";

import Rotator from "./rotator";

class App extends Component {
  render() {
    const words = ["trainer", "dietician", "activity expert", "sleep coach"];

    return <Rotator words={words} updateIntervalTime={3000} />;
  }
}

export default App;
