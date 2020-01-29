import * as React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import * as Types from "EqTypes";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ICar} from "EqTypes";
import {useEffect} from "react";
import {fetchCars} from "../../reducers/car-reducers";
import LoadingProgress from "../../components/loading-progress/loading-progress";

import './style.scss';

const TableOfContents = props => {
  let carsJSX: JSX.Element[] | JSX.Element;

  props.list.length
      ? carsJSX = props.list.map((car: ICar, index: number) => {

        return (
            <TableRow key={`${car.vin}_${index}`}>
              <TableCell>{car.vin}</TableCell>
              <TableCell align="right">{car.brand}</TableCell>
              <TableCell align="right">{car.model}</TableCell>
              <TableCell align="right">{car.grade}</TableCell>
              <TableCell align="right">{car.dealer || 'Loading...'}</TableCell>
              <TableCell align="right">{car.dealer || 'Loading...'}</TableCell>
            </TableRow>
        )
      })
      : carsJSX = (
          <TableRow/>
      );

  return (
      <TableContainer component={Paper}>
        <Table aria-label="cars">
          <TableHead>
            <TableRow>
              <TableCell>VIN</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">Dealer</TableCell>
              <TableCell align="right">Dealer Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carsJSX}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

const Cars = props => {
  useEffect(() => {
    !props.list.length
      && props.getInitialList();
  });

  return (
      <div className="container">
        <div className="table-layout">
          <LoadingProgress loading={props.loading}/>
          <TableOfContents {...props}/>
        </div>
      </div>
  );
};

const MapStateToProps = (store: Types.ReducerState) => {
  return {
    count: store.cars.count,
    list: store.cars.list,
    loading: store.cars.loading
  };
};

const MapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  getInitialList: () => {
    dispatch(fetchCars())
  }
});

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Cars);
