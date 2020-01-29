import { combineReducers } from "redux";
import { todoReducer } from "./todoReducers";
import { carReducer} from "./carReducers";

const rootReducer = combineReducers({
  todo: todoReducer,
  cars: carReducer
});

export default rootReducer;
