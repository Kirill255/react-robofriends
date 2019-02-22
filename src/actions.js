import { CHANGE_SEARCHFIELD } from "./constants";

// возвращает объект с полями type и payload
export const setSearchField = (text) => ({ type: CHANGE_SEARCHFIELD, payload: text });
