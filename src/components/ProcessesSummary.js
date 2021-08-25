import React from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import numbro from 'numbro';

export default function ProcessesSummary(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Общая загрузка процессора</TableCell>
            <TableCell>{(props.cpu)?numbro(props.cpu).format({mantissa: 2})+"%":"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Общая загрузка памяти, Мб</TableCell>
            <TableCell>{(props.memory)?numbro(props.memory).format({output: "byte",base:"decimal",thousandSeparated: true, mantissa: 2, spaceSeparated: true}):"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Минимальное время от старта, сек</TableCell>
            <TableCell>{(props.elapsedMin)?numbro(props.elapsedMin/1000).format({output: "time"}):"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Максимальное время от старта, сек</TableCell>
            <TableCell>{(props.elapsedMax)?numbro(props.elapsedMax/1000).format({output: "time"}):"Недоступно"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
