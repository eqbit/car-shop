import * as Types from 'EqTypes';
import {actionTypes} from "../actions/";

interface ITodoModel {
  count: number;
  list: Types.ICar[];
}

export const initialState: ITodoModel = {
  count: 2,
  list: [
    {
      VIN: 'aasdas2',
      Brand: 'Alfa Romeo',
      Grade: 'Classic',
      Model: '453s',
      Dealer: 'fdsf3sad'
    }
  ]
};

export const carReducer = (state: ITodoModel = initialState, action: Types.RootAction) => {
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
        list: list
      };
    }
    default:
      return state;
  }
};
