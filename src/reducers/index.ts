import { combineReducers } from "redux";
import { carReducer} from "./car-reducers";

const rootReducer = combineReducers({
  cars: carReducer
});

export default rootReducer;
