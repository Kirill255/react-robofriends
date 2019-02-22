import React, { Component } from "react";
import { connect } from "react-redux";

import { setSearchField } from "../../actions";

import "./App.css";

import CardList from "../../components/CardList/CardList";
import SearchBox from "../../components/SearchBox/SearchBox";
import Scroll from "../../components/Scroll/Scroll";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchField // вообще должно быть так searchField: state.searchRobots.searchField, но сейчас у нас только один reducer в сторе, const store = createStore(searchRobots);
  };
};

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: []
    };
  }

  componentDidMount() {
    const url = "http://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }))
      .catch((err) => console.log(err));
  }

  render() {
    const { robots } = this.state;
    // эти поля из стейта нам приходят как пропсы
    const { searchField, onSearchChange } = this.props;

    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return !robots.length ? (
      <h1>Loading...</h1>
    ) : (
      <div className="App tc">
        <h1 className="f1">Robofriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundary>
            <CardList robots={filteredRobots} />
          </ErrorBoundary>
        </Scroll>
      </div>
    );
  }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
