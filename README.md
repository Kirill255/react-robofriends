This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Relative

https://github.com/aneagoie/robofriends

https://github.com/aneagoie/robofriends-redux

## Redux, react-redux

Мы создаём action который возвращает объект с полями type и payload:

```js
export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text });
```

дальше мы создаём reducer который принимает начальный state и action (action это объект с полями type и payload):

```js
const initialStateSearch = {
  searchField: ""
};

export const searchRobots = (state = initialStateSearch, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return Object.assign({}, state, { searchField: action.payload });
    default:
      return state;
  }
};
```

дальше подключаем redux к приложению в index.js:

```js
import { createStore } from "redux";
import { Provider } from "react-redux";

// импортируем наш reducer
import { searchRobots } from "./reducers";

// создали store и передали в него reducer
const store = createStore(searchRobots);

// передали store в приложение, через компонент-обёртку Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

дальше в компоненте в котором собираемся взаимодействовать со стором, например в App:

```js
import { connect } from "react-redux";

// импортируем наш action
import { setSearchField } from "../../actions";

// дальше создаём две функции mapStateToProps и mapDispatchToProps

// parameter state comes from index.js provider store state(rootReducers)
// параметр state приходит сам(это бойлерплейт код), мы его уже передавали в Provider, тоесть это наш текущий стейт/стор, у которого есть поля с нашими reducers
// вообще должно быть так searchField: state.searchRobots.searchField, но сейчас у нас только один reducer в сторе, помните? const store = createStore(searchRobots);
const mapStateToProps = (state) => {
  return {
    searchField: state.searchField
  };
};

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
// параметр dispatch приходит сам(это бойлерплейт код), внутри создаём обработчик onSearchChange, который принимает event, дальше диспатчим наш экшен setSearchField со значением поля, помните нашу локальный обработчик, когда был локальный стейт, вот и тут почти тоже самое, только теперь у нас redux
/* 
// локальный обработчик
onSearchChange = (event) => {
  this.setState({ searchfield: event.target.value })
}
*/
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value))
  };
};

// дальше нужно всё это нужно соеденить через react-redux connect, redux и компонент
// action done from mapDispatchToProps will channge state from mapStateToProps
// это бойлерплейт код, передаём в connect наши две функции, со стейтом и диспатчем, а также передаём наш компонент App вторым вызовом
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```

теперь внутри компонента App мы можем получить наши свойства через props:

```js
const { searchField, onSearchChange } = this.props;
```

## Redux-thunk

Подключаем в index.js и передаём в store как middleware первой в очереди:

```js
import thunkMiddleware from "redux-thunk";

// порядок middlewares важен, т.к. они выполняются в порядке объявления
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));
```

Всё! Redux-thunk подключены и теперь когда redux слушает actions, если он видит что action возвращает не просто объект `export const setSearchField = () => ({});`, а возвращает функцию `export const requestRobots = () => () => {}`, то redux передаёт управление в redux-thunk, дальше когда redux-thunk видит что action возвращает функцию, он сам передаёт в неё аргумент dispatch, который мы потом вызовем в нужный момент `export const requestRobots = () => (dispatch) => {}`

```js
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });

  const url = "http://jsonplaceholder.typicode.com/users";
  fetch(url)
    .then((response) => response.json())
    .then((users) => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: users }))
    .catch((err) => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: err }));
};
```

дальше в компоненте создаём обработчик:

```js
import { requestRobots } from "../../actions";

const mapDispatchToProps = (dispatch) => {
  return {
    //...
    onRequestRobots: () => dispatch(requestRobots())
  };
};
```

а в нужный нам момент вызываем:

```js
componentDidMount() {
  this.props.onRequestRobots();
}
```
