import { apiCall } from "./api/api";

import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
} from "./constants";

// возвращает объект с полями type и payload
export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text });

// возвращает функцию
export const requestRobots = () => (dispatch) => {
  dispatch({ type: REQUEST_ROBOTS_PENDING });

  const url = "http://jsonplaceholder.typicode.com/users";
  apiCall(url)
    .then((users) => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: users }))
    .catch((err) => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: err }));
};
