import * as Types from "EqTypes";
import { actionTypes } from "../actions/";

interface ITodoModel {
  count: number;
  list: string[];
}

export const initialState: ITodoModel = {
  count: 2,
  list: ["Do the laundry", "Do the dishes"]
};

export const todoReducer = (state: ITodoModel = initialState, action: Types.RootAction) => {
  switch (action.type) {
    case actionTypes.ADD: {
      return {
        ...state,
        count: state.count + 1,
        list: [...state.list, action.payload]
      };
    }
    case actionTypes.DELETE: {
      const list = [...state.list];
      list.splice(action.payload, 1);

      return {
        ...state,
        count: state.count - 1,
        list
      };
    }
    default:
      return state;
  }
};
