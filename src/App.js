import React, { Component } from "react";
import "./App.css";

import CardList from "./components/CardList/CardList";
import SearchBox from "./components/SearchBox/SearchBox";
import { robots } from "./robots";

class App extends Component {
  render() {
    return (
      <div className="App tc">
        <h1>Robofriends</h1>
        <SearchBox />
        <CardList robots={robots} />
      </div>
    );
  }
}

export default App;
