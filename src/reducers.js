import { CHANGE_SEARCHFIELD } from "./constants";

const initialStateSearch = {
  searchField: ""
};

// принимает начальный state и action (action это объект с полями type и payload)
export const searchRobots = (state = initialStateSearch, action = {}) => {
  console.log(state);
  console.log(action);
  switch (action.type) {
    case CHANGE_SEARCHFIELD:
      return Object.assign({}, state, { searchField: action.payload });
    // return { ...state,  searchField: action.payload }; // тоже самое, и меньше кода
    default:
      return state;
  }
};
