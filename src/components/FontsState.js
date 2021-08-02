import React from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function FontsState(props) {
  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Количество хранилищ</TableCell>
            <TableCell>{(props.storeAmount)?props.storeAmount:"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Количество шрифтов</TableCell>
            <TableCell>{(props.dictionary)?props.dictionary.length:"Недоступно"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
