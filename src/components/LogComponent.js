import React, { Component } from 'react';

import clsx from 'clsx';
import { withStyles } from "@material-ui/core/styles";

import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = (theme) => ({
  title: {
    flexGrow: 1,
  },
  logTable: {
    fontSize: " .7rem",
    whiteSpace: "nowrap",
  },
  infoIcon: {
    color: theme.palette.text.secondary,
    opacity:0.5,
    width:18,
    height:18,
  },
  infoButton: {
    padding:theme.spacing(0),
  }
});



class LogComponent extends Component {

  constructor(props) {
    super(props);
    this.state={
      isOpen:false,
      recordData:[],
    }
    this.closeHandler=this.closeHandler.bind(this);
    this.clickHandler=this.clickHandler.bind(this);

  }

  closeHandler() {
    this.setState({
      isOpen:false,
    })
  }

  clickHandler(event) {
    let record=this.props.log[event.currentTarget.value]
    if (record) {
      this.showDetails(record);
    }
  }

  showDetails(record) {

    let recordData=record.slice(0,4);
    for (let i = 0; i < record[4].length; i++) {
      let dataItem=record[4][i];
      if (typeof dataItem === 'string') {
        if (dataItem.trim()!='') {
          recordData.push(dataItem)
        }
      } else
      if (dataItem) {
        recordData.push(JSON.stringify(dataItem));
      }
    }

    this.setState({
      isOpen:true,
      recordData:recordData,
    })
  }

  render() {
    const { classes } = this.props;
    let log=(this.props.log)?this.props.log:[];
    return (
      <React.Fragment>
        <Title>{this.props.title}</Title>
        <Table size="small">
          <TableHead >
            <TableRow>
              <TableCell>Дата</TableCell>
              <TableCell>Сообщение</TableCell>
              <TableCell></TableCell>
              <TableCell>Объект</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              log.map((record,i) => {
                return (
                  <TableRow
                    key={"record"+i}
                  >
                    <TableCell className={classes.logTable}>{record[0]}</TableCell>
                    <TableCell className={classes.logTable}>{record[3]}</TableCell>
                    <TableCell >{(record[4].length>0)?
                      <IconButton
                        value={i}
                        color="primary"
                        aria-label="Подробнее"
                        className={classes.infoButton}
                        onClick={this.clickHandler}
                      >
                        <InfoIcon className={classes.infoIcon}/>
                      </IconButton>
                      :[]}
                    </TableCell>
                    <TableCell className={classes.logTable}>{record[1]}</TableCell>
                  </TableRow>
                )
              }).reverse()
            }
          </TableBody>
        </Table>
        <Dialog
          open={this.state.isOpen}
          onClose={this.closeHandler}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Table size="small">
              <TableBody>
                {
                  this.state.recordData.map((item,i) => {
                    return (
                      <TableRow
                        key={"item"+i}
                      >
                        <TableCell>{item}</TableCell>
                      </TableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.closeHandler}
              color="primary"
            >
              Закрыть
            </Button>
          </DialogActions>

        </Dialog>
      </React.Fragment>
    );
  }

}
export default withStyles(useStyles, { withTheme: true })(LogComponent);
