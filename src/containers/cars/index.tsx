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
import {actionTypes} from "../../actions";
import {connect} from "react-redux";
import {ICar} from "EqTypes";

const TableOfContents = props => {
  let carsJSX: JSX.Element[] | JSX.Element;

  props.list.length
      ? carsJSX = props.list.map((car: ICar) => (
          <TableRow key={car.VIN}>
            <TableCell>{car.VIN}</TableCell>
            <TableCell align="right">{car.Brand}</TableCell>
            <TableCell align="right">{car.Model}</TableCell>
            <TableCell align="right">{car.Grade}</TableCell>
            <TableCell align="right">{car.Dealer || 'Loading...'}</TableCell>
            <TableCell align="right">{car.Dealer || 'Loading...'}</TableCell>
          </TableRow>
      ))
      : carsJSX = (
          <TableRow>
            <TableCell/>
            <TableCell align="right"/>
            <TableCell align="right"/>
            <TableCell align="right"/>
            <TableCell align="right"/>
            <TableCell align="right"/>
          </TableRow>
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

const Cars = props => (
    <div className="container">
      <TableOfContents {...props}/>
    </div>
);

const MapStateToProps = (store: Types.ReducerState) => {
  return {
    count: store.cars.count,
    list: store.cars.list
  };
};

const MapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) => ({
  addToDo: (item: string) => dispatch({ type: actionTypes.ADD, payload: item }),
  deleteToDo: (idx: number) => dispatch({ type: actionTypes.DELETE, payload: idx })
});

export default connect(
    MapStateToProps
)(Cars);
