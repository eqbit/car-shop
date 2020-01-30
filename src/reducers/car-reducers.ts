import * as Types from 'EqTypes';
import {actionTypes} from "../actions/";

interface IStore {
  loading: boolean;
  count: number;
  cars: Types.ICar[];
  dealers: Types.IDealer[]
}

export const initialState: IStore = {
  loading: true,
  count: 0,
  cars: [],
  dealers: []
};

export const carReducer = (state: IStore = initialState, action: Types.RootAction) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_CARS:
      return {
        ...state,
        count: action.payload.count,
        cars: [...action.payload.data]
      };

    case actionTypes.FETCH_DEALERS:
      return {
        ...state,
        loading: false,
        dealers: [...state.dealers, ...action.payload.newDealers],
        cars: action.payload.newCars
      };

    default:
      return state;
  }
};
