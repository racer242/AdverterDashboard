import React, { Component } from 'react';

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

import CampTree from './CampTree';
import CampContent from './CampContent';

const useStyles = (theme) => ({
  title: {
    flexGrow: 1,
  },
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



class Camps extends Component {

  constructor(props) {
    super(props);
    this.state={
      client:"",
      camp:"",
      feature:"",
      subject:"",
    };
    this.onSelectHandler=this.onSelectHandler.bind(this);
  }

  onSelectHandler(client,camp,feature,subject) {
    this.setState({
      client,
      camp,
      feature,
      subject,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={1} className={classes.gridContainer}>
        <Grid item xs={12} lg={6} className={classes.gridColumn} style={{width:"40%"}}>
          <div className={classes.padding}>
            <CampTree
              title="Кампании"
              reports={(this.props.reports)?this.props.reports:[]}
              onSelect={this.onSelectHandler}
            />
          </div>
        </Grid>
        <Grid item xs={12} lg={6} className={classes.gridColumn} style={{width:"60%"}}>
          <div className={classes.padding}>
            <CampContent
              title="Креативы"
              reports={(this.props.reports)?this.props.reports:[]}
              client={this.state.client}
              camp={this.state.camp}
              feature={this.state.feature}
              subject={this.state.subject}
            />
          </div>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(useStyles, { withTheme: true })(Camps);
