import React, { Component } from 'react';

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";

import LogComponent from './LogComponent';

const useStyles = (theme) => ({
  gridContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: 0,
    height: "100%",
  },
  gridColumn: {
    flexGrow: 1,
    overflow: "auto",
    minHeight: "100%",
  },
  padding: {
    padding: theme.spacing(2),
  },
});

class Log extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} lg={12} className={classes.gridColumn} style={{width:"100%"}}>
            <div className={classes.padding}>
              <LogComponent
                title="Лог"
                log={this.props.log}
              />
            </div>
          </Grid>
        </Grid>

      </React.Fragment>
    );
  }

}
export default withStyles(useStyles, { withTheme: true })(Log);
