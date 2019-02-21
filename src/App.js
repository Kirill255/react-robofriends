import React, { Component } from "react";
import "./App.css";

import CardList from "./components/CardList/CardList";
import { robots } from "./robots";

class App extends Component {
  render() {
    return (
      <div className="App">
        <CardList robots={robots} />
      </div>
    );
  }
}

export default App;
