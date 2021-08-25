import React, { Component } from 'react';

import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Title from './Title';
import BuildingNodesState from './BuildingNodesState';
import ProcessState from './ProcessState';
import BuildingProcesses from './BuildingProcesses';
import ProcessesSummary from './ProcessesSummary';
import Chart from './Chart';
import LogComponent from './LogComponent';

const useStyles = (theme) => ({
  title: {
    flexGrow: 1,
  },

  padding: {
    padding: theme.spacing(2),
  },

  comboBox: {
    marginTop:  theme.spacing(2),
    marginBottom:  theme.spacing(4),
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



class BuildingNodes extends Component {

  constructor(props) {
    super(props);

    this.state= {
      node:"",
    }

    this.node_changeHandler=this.node_changeHandler.bind(this);
  }

  node_changeHandler(event) {
    this.setState({
      node:event.target.value,
    });
  }

  updateFirstNode() {
    if (
      (this.state.node=="")&&
      ((this.props)&&(this.props.nodes)&&(Object.keys(this.props.nodes).length>0))
    ) {
      this.setState({
        node:Object.keys(this.props.nodes)[0],
      });
    }
  }

  componentDidMount() {
    this.updateFirstNode();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateFirstNode();
  }

  render() {
    const { classes } = this.props;

    const smallHeightPaper = clsx(classes.paper, classes.smallHeight);
    const largeHeightPaper = clsx(classes.paper, classes.largeHeight);

    let nodeIds=[];
    if (this.props.nodes) {
      nodeIds=Object.keys(this.props.nodes);
    }

    let selectedNode=null;
    if ((this.props.nodes)&&(this.state.node)&&(this.props.nodes[this.state.node])) {
      selectedNode=this.props.nodes[this.state.node];
    }

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={classes.paper}>
            <Title>Серверы сборки:</Title>
            <BuildingNodesState
              nodes={this.props.nodes}
            />
            <FormControl className={classes.comboBox}>
              <InputLabel id="demo-simple-select-label">Выбор сервера</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={this.state.node}
                onChange={this.node_changeHandler}
              >
                {
                  nodeIds.map((nodeId,i) => (
                    <MenuItem
                      key={"node"+i}
                      value={nodeId}
                    >{nodeId+" ("+this.props.nodes[nodeId].address+")"}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
        </Grid>
        {
          (selectedNode)?
            <React.Fragment>
              <Grid item xs={12} md={6} lg={6}>
              <Paper className={smallHeightPaper}>
                <ProcessState
                  title={"Процесс управления сервером сборки"}
                  address={selectedNode.address}
                  pid={(selectedNode.process)?selectedNode.process.pid:null}
                  cpu={(selectedNode.process)?selectedNode.process.cpu:null}
                  memory={(selectedNode.process)?selectedNode.process.memory:null}
                  elapsed={(selectedNode.process)?selectedNode.process.elapsed:null}
                />
              </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
              <Paper className={smallHeightPaper}>
                <ProcessesSummary
                  title={"Общая производительность"}
                  cpu={((selectedNode.builders)&&(selectedNode.builders.summary)&&(selectedNode.process))?(selectedNode.builders.summary.cpu+selectedNode.process.cpu):null}
                  memory={((selectedNode.builders)&&(selectedNode.builders.summary)&&(selectedNode.process))?(selectedNode.builders.summary.memory+selectedNode.process.memory):null}
                  elapsedMin={((selectedNode.builders)&&(selectedNode.builders.summary)&&(selectedNode.process))?selectedNode.builders.summary.elapsedMin:null}
                  elapsedMax={((selectedNode.builders)&&(selectedNode.builders.summary)&&(selectedNode.process))?selectedNode.builders.summary.elapsedMax:null}
                />
              </Paper>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Paper className={smallHeightPaper}>
                  <Chart
                    title="Процессор, %"
                    data={(selectedNode.performance)?selectedNode.performance:[{c:0,t:0}]}
                    xKey="t"
                    yKey={["c"]}
                    legend={false}
                  />
                </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                <Paper className={smallHeightPaper}>
                  <Chart
                    title="Память, Мб"
                    data={(selectedNode.performance)?selectedNode.performance:[{m:0,t:0}]}
                    xKey="t"
                    yKey={["m"]}
                    legend={false}
                  />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper}>
                  <BuildingProcesses
                    title={"Процессы сборки на сервере"}
                    builders={selectedNode.builders}
                    />
                </Paper>
              </Grid>
              <Grid item xs={12} lg={12} className={classes.gridColumn} style={{width:"100%"}}>
                <div className={classes.padding}>
                  <LogComponent
                    title="Лог"
                    log={selectedNode.log}
                  />
                </div>
              </Grid>
            </React.Fragment>
          :[]
        }

      </Grid>
    );
  }

}
export default withStyles(useStyles, { withTheme: true })(BuildingNodes);
