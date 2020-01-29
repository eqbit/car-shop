declare module "EqTypes" {
  import { StateType, ActionType } from "typesafe-actions";

  export type ReducerState = StateType<typeof import("../reducers").default>;
  export type RootAction = ActionType<typeof import("../actions/actions")>;

  export interface ICar {
    VIN: string
    Brand: string
    Model: string
    Grade: string
    Dealer: string
  }

  export interface IDealer {
    Name: string
    Address: string
  }
}
