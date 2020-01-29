import { combineReducers } from "redux";
import { carReducer} from "./carReducers";

const rootReducer = combineReducers({
  cars: carReducer
});

export default rootReducer;
