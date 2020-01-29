import * as Types from 'EqTypes';
import { Action } from 'redux'
import {actionTypes, carsActions} from "../actions/";
import { ThunkAction } from 'redux-thunk'

interface IStore {
  loading: boolean;
  count: number;
  list: Types.ICar[];
}

export const initialState: IStore = {
  loading: true,
  count: 0,
  list: []
};

const fetchCarsRequest = () => ({
  type: actionTypes.FETCH_CARS_REQUEST
});

const fetchCarsSuccess = cars => ({
  type: actionTypes.FETCH_CARS_SUCCESS,
  payload: cars
});


export const carReducer = (state: IStore = initialState, action: Types.RootAction) => {
  switch (action.type) {
    case actionTypes.FETCH_CARS_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        count: action.payload.count,
        list: [...state.list, ...action.payload.data]
      };

    default:
      return state;
  }
};

export const fetchCars = (): any => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-CS-Dealer-Id-Only', '1');

  let count;

  return (dispatch) => {
    dispatch(fetchCarsRequest());

    fetch('https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&per_page=10&page=0', {
      headers: requestHeaders
    })
        .then(response => {
          count = response.headers.get('X-Total-Count');
          return response.json()
        })
        .then(data => {
          dispatch(fetchCarsSuccess({data, count}))
        })
  }
};
