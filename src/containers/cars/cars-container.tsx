import * as React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import * as Types from "EqTypes";
import {connect} from "react-redux";
import {ICar} from "EqTypes";
import {useEffect} from "react";
import {fetchCarsMiddleware} from "../../actions";
import LoadingProgress from "../../components/loading-progress/loading-progress";
import ReactPaginate from 'react-paginate';
import {CARS_PER_PAGE} from "../../constants";
import './style.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      cell: {
        wordBreak: 'break-word'
      }
    }),
);

const TableOfContents = props => {
  const classes = useStyles();

  let carsJSX: JSX.Element[] | JSX.Element;

  props.cars.length
      ? carsJSX = props.cars.map((car: ICar, index: number) => {
        return (
            <TableRow key={`${car.vin}_${index}`}>
              <TableCell align="left" className={classes.cell}>{car.vin}</TableCell>
              <TableCell align="right" className={classes.cell}>{car.brand}</TableCell>
              <TableCell align="right" className={classes.cell}>{car.model}</TableCell>
              <TableCell align="right" className={classes.cell}>{car.grade}</TableCell>
              <TableCell align="right" className={classes.cell}>{car.dealerName || 'not found'}</TableCell>
              <TableCell align="right" className={classes.cell}>{
                !!car.dealerAddresses && car.dealerAddresses.map(address => <p>{address}</p>)
              }</TableCell>
            </TableRow>
        )
      })
      : carsJSX = (
          <TableRow/>
      );

  return (
      <TableContainer component={Paper}>
        <Table aria-label="cars" style={{width: "95%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              <TableCell align="left" className={classes.cell}>VIN</TableCell>
              <TableCell align="right" className={classes.cell}>Brand</TableCell>
              <TableCell align="right" className={classes.cell}>Model</TableCell>
              <TableCell align="right" className={classes.cell}>Grade</TableCell>
              <TableCell align="right" className={classes.cell}>Dealer</TableCell>
              <TableCell align="right" className={classes.cell}>Dealer Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carsJSX}
          </TableBody>

          {!!props.count && <>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <ReactPaginate pageCount={Math.ceil(props.count / CARS_PER_PAGE)}
                                 pageRangeDisplayed={2}
                                 marginPagesDisplayed={3}
                                 onPageChange={({selected: page}) => {props.fetchCars(page)}}
                                 containerClassName='pagination'/>
                </TableCell>
              </TableRow>
            </TableFooter>
          </>}

        </Table>
      </TableContainer>
  );
};

const Cars = props => {
  useEffect(() => {
    !props.cars.length
      && props.fetchCars();
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
    cars: store.cars.cars,
    loading: store.cars.loading
  };
};

const MapDispatchToProps = (dispatch) => ({
  fetchCars: (page?: number) => {
    dispatch(fetchCarsMiddleware(page))
  }
});

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Cars);
