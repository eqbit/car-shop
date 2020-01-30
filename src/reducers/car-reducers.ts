import * as Types from 'EqTypes';
import {actionTypes, carsActions} from "../actions/";
import {CARS_PER_PAGE} from "../constants";

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

const fetchCarsRequest = () => ({
  type: actionTypes.FETCH_CARS_REQUEST
});

const fetchCarsSuccess = cars => ({
  type: actionTypes.FETCH_CARS_SUCCESS,
  payload: cars
});

const fetchDealers = dealer => ({
  type: actionTypes.FETCH_DEALERS,
  payload: dealer
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
        cars: [...action.payload.data]
      };

    case actionTypes.FETCH_DEALERS:
      return {
        ...state,
        loading: false,
        dealers: [...state.dealers, action.payload]
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
          dispatch(fetchCarsSuccess({data, count}));

          const dealerIDs = data.map(item => item.dealer)
              .sort()
              .filter((item, pos, arr) => !pos || item != arr[pos - 1]);
          dispatch(fetchNeededDealers(dealerIDs));
        })
  }
};

const fetchNeededDealers = (dealerIDs: String[]) => {
  return (dispatch, getState) => {
    const {dealers} = getState();

    const foundDealers = dealers ? dealers.filter(dealer => dealerIDs.includes(dealer.id)).map(dealer => dealer.id) : [];
    dealerIDs = dealerIDs.filter(id => !foundDealers.includes(id));

    if(foundDealers.length < dealerIDs.length) {
      dealerIDs.forEach(id => {
        fetch(`https://jlrc.dev.perx.ru/carstock/api/v1/dealers/?id=${id}`)
            .then(response => response.json())
            .then(dealer => {
              dispatch(fetchDealers({
                id: id,
                name: dealer[0].name,
                address: dealer[0].offices
                    .map(office => office.address)
                    .sort()
                    .filter((item, pos, arr) => !pos || item != arr[pos - 1])
              }))
            })
      })
    }
  }
};
