import {CARS_PER_PAGE} from "../constants";
import {getUniqueValuesFromArray} from "../utils";

export enum actionTypes {
  FETCH_CARS = 'FETCH_CARS',
  FETCH_DEALERS = 'FETCH_DEALERS',
  SET_LOADING = 'SET_LOADING'
}

const setLoading = () => ({
  type: actionTypes.SET_LOADING
});

const fetchCarsSuccess = cars => ({
  type: actionTypes.FETCH_CARS,
  payload: cars
});

const fetchDealers = data => ({
  type: actionTypes.FETCH_DEALERS,
  payload: data
});

export const fetchCarsMiddleware = (page: number = 0): any => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-CS-Dealer-Id-Only', '1');

  let count;

  return (dispatch, getState) => {
    dispatch(setLoading());

    fetch(`https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&per_page=${CARS_PER_PAGE}&page=${page}`, {
      headers: requestHeaders
    })
        .then(response => {
          count = response.headers.get('X-Total-Count');
          return response.json()
        })
        .then(data => {
          dispatch(fetchCarsSuccess({data, count}));
          dispatch(fetchDealersMiddleware(data));
        })
  }
};

const fetchDealersMiddleware =(data) => {
  return async (dispatch, getState) => {
    const {dealers, cars} = getState().cars;

    let dealerIDs = getUniqueValuesFromArray(data.map(item => item.dealer));

    const foundDealers = dealers
        ? dealers.filter(dealer => dealerIDs.includes(dealer.id))
            .map(dealer => dealer.id)
        : [];

    let dealerIDsToFetch = dealerIDs.filter(id => !foundDealers.includes(id));

    let newDealers = [];

    if (dealerIDsToFetch.length) {
      const response = await fetch(`https://jlrc.dev.perx.ru/carstock/api/v1/dealers/?id__in=${dealerIDsToFetch.join(',')}`);
      newDealers = await response.json();
    }

    const newCars = cars.map(car => {
      let computedDealer = newDealers.find(item => item.id === car.dealer)
          || dealers.find(item => item.id === car.dealer);

      let dealerName = computedDealer ? computedDealer.name : '';
      let dealerAddresses = computedDealer
          ? getUniqueValuesFromArray(computedDealer.offices.map(office => office.address))
          : [];

      return {
        ...car,
        dealerName,
        dealerAddresses
      }
    });

    dispatch(fetchDealers({
      newCars,
      newDealers
    }));
  }
};
