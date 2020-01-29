import * as Types from 'EqTypes';
import {actionTypes} from "../actions/";

interface IStore {
  count: number;
  list: Types.ICar[];
}

export const initialState: IStore = {
  count: 1,
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

export const carReducer = (state: IStore = initialState, action: Types.RootAction) => {
  switch (action.type) {
    case actionTypes.ADD: {
      return {
        ...state,
        count: state.count + 1,
        list: [...state.list, action.payload]
      };
    }
    default:
      return state;
  }
};
