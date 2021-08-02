import React, { Component } from 'react';

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

import ProcessState from './ProcessState';
import BuildingState from './BuildingState';
import Chart from './Chart';

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
  smallHeight: {
    height: 300,
  },
  largeHeight: {
    height: 500,
  },
});



class Status extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const smallHeightPaper = clsx(classes.paper, classes.smallHeight);
    const largeHeightPaper = clsx(classes.paper, classes.largeHeight);
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={smallHeightPaper}>
            <ProcessState
              title="Центральный процесс"
              pid={(this.props.process)?this.props.process.pid:null}
              cpu={(this.props.process)?this.props.process.cpu:null}
              memory={(this.props.process)?this.props.process.memory:null}
              elapsed={(this.props.process)?this.props.process.elapsed:null}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={smallHeightPaper}>
            <Chart
              title="Процессор, %"
              data={(this.props.performance)?this.props.performance:[{c:0,t:0}]}
              xKey="t"
              yKey={["c"]}
              legend={false}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <Paper className={smallHeightPaper}>
            <Chart
              title="Память, Мб"
              data={(this.props.performance)?this.props.performance:[{m:0,t:0}]}
              xKey="t"
              yKey={["m"]}
              legend={false}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Paper className={smallHeightPaper}>
            <Chart
              title="Производво, шт"
              data={(this.props.performance)?this.props.performance:[{s:0,r:0,f:0,i:0,t:0}]}
              xKey="t"
              yKey={["p","s","r","f","i"]}
              legend={true}
              colors={["blue","green","orange","red","grey"]}
              yNames={["in progress","success","runtime error","fatal error","internal error"]}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Paper className={largeHeightPaper}>
            <BuildingState
              title="Сборка"
              builders={(this.props.builders)?this.props.builders:[]}
              tasks={(this.props.tasks)?this.props.tasks:[]}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(useStyles, { withTheme: true })(Status);
