import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

import numbro from 'numbro';

const useStyles = makeStyles((theme) => ({
  container: {
  },
}));

export default function BuildingProcesses(props) {

  const classes = useStyles();
  // state:"work"
  // address:"192.168.0.107"
  // id:"bLJBK"
  // pid:14452
  // cpu:0.532
  // memory:81432576
  // elapsed:7112903

  let processes=[];
  if ((props.builders)&&(props.builders.processes)) {
    processes=Object.keys(props.builders.processes);
  }

  return (
    <React.Fragment>
      <Title>{props.title}</Title>

      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader>
          <TableHead >
            <TableRow>
              <TableCell>Идентификатор</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>PID</TableCell>
              <TableCell>Загрузка процессора</TableCell>
              <TableCell>Загрузка памяти, Мб</TableCell>
              <TableCell>Время от старта, сек</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              processes.map((processId,i) => {
                let process=props.builders.processes[processId];
                return (
                  <TableRow key={"process"+i}>
                    <TableCell>{processId}</TableCell>
                    <TableCell>{process.address}</TableCell>
                    <TableCell>{process.pid}</TableCell>
                    <TableCell>{numbro(process.cpu).format({mantissa: 2})+"%"}</TableCell>
                    <TableCell>{numbro(process.memory).format({output: "byte",base:"decimal",thousandSeparated: true, mantissa: 2, spaceSeparated: true})}</TableCell>
                    <TableCell>{numbro(process.elapsed/1000).format({output: "time"})}</TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

    </React.Fragment>
  );
}
