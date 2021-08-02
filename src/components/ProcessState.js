import React from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import numbro from 'numbro';

export default function ProcessState(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Идентификатор процесса</TableCell>
            <TableCell>{(props.pid)?props.pid:"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Загрузка процессора</TableCell>
            <TableCell>{(props.cpu)?numbro(props.cpu).format({mantissa: 2})+"%":"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Загрузка памяти, Мб</TableCell>
            <TableCell>{(props.memory)?numbro(props.memory).format({output: "byte",base:"decimal",thousandSeparated: true, mantissa: 2, spaceSeparated: true}):"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Время от старта, сек</TableCell>
            <TableCell>{(props.elapsed)?numbro(props.elapsed/1000).format({output: "time"}):"Недоступно"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
