import {action} from "typesafe-actions";

export enum actionTypes {
  ADD = "ADD",
  DELETE = "DELETE"
}

export const todoActions = {
  add: (item: string) => action(actionTypes.ADD, item),
  delete: (index: number) => action(actionTypes.DELETE, index)
};

export const fetchCars = () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('X-CS-Dealer-Id-Only', '1');

  fetch('https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&per_page=10&page=0', {
    headers: requestHeaders
  })
      .then(response => {
        console.log(response.headers.get('X-Total-Count'))
        return response.json()
      })
      .then(data => console.log(data))
};


