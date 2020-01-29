import * as Types from 'EqTypes';
import {actionTypes, carsActions} from "../actions/";
import {CARS_PER_PAGE} from "../constants";

interface IStore {
  loading: boolean;
  count: number;
  list: Types.ICar[];
  dealers: Types.IDealer[]
}

export const initialState: IStore = {
  loading: true,
  count: 0,
  list: [],
  dealers: []
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
        count: action.payload.count,
        list: [...action.payload.data]
      };

    case actionTypes.FETCH_DEALERS_SUCCESS:
      return {
        ...state,
        loading: false,
        dealers: [...state.dealers, ...action.payload]
      };

    default:
      return state;
  }
};

export const fetchCars = (page: number = 0): any => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-CS-Dealer-Id-Only', '1');

  let count;

  return (dispatch) => {
    dispatch(fetchCarsRequest());

    fetch(`https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&per_page=${CARS_PER_PAGE}&page=${page}`, {
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
