import React, { Component } from 'react';

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

import FontsState from './FontsState';
import FontsDictionary from './FontsDictionary';

const useStyles = (theme) => ({
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
});



class Fonts extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <FontsState
              title="Шрифты"
              storeAmount={(this.props.fonts)?this.props.fonts.storeAmount:null}
              dictionary={(this.props.fonts)?this.props.fonts.dictionary:null}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <FontsDictionary
              title="Библиотека"
              dictionary={(this.props.fonts)?this.props.fonts.dictionary:[]}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(useStyles, { withTheme: true })(Fonts);
