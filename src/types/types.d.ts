declare module "EqTypes" {
  import { StateType, ActionType } from "typesafe-actions";

  export type ReducerState = StateType<typeof import("../reducers").default>;
  export type RootAction = ActionType<typeof import("../actions")>;

  export interface ICar {
    vin: string
    brand: string
    model: string
    grade: string
    dealer: string
    dealerName: string
    dealerAddresses: string[]
  }

  export interface IDealer {
    id: string
    name: string
    address: string[]
  }
}
