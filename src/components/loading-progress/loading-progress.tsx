import * as React from "react";
import { lighten, makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import './style.scss';

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
})(LinearProgress);

const LoadingProgress = props => (
    <div className="loading-progress">
      {props.loading && <ColorLinearProgress/>}
    </div>
);

export default LoadingProgress;
