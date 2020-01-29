import {action} from "typesafe-actions";
import {ICar} from "EqTypes";

interface ISuccessPayload {
  data: ICar[];
  count: number;
}

export enum actionTypes {
  FETCH_CARS_SUCCESS = 'FETCH_CARS_SUCCESS',
  FETCH_CARS_REQUEST = 'FETCH_CARS_REQUEST'
}

export const carsActions = {
  fetchRequest: (cars: ICar[]) => action(actionTypes.FETCH_CARS_REQUEST, cars),
  fetchSuccess: (payload: ISuccessPayload) => action(actionTypes.FETCH_CARS_SUCCESS, payload)
}


