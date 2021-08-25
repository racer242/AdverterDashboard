import React from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import numbro from 'numbro';

export default function BuildingNodesState(props) {
  let buildersCount=-1;
  if (props.nodes) {
    buildersCount=0;
    for (let nodeId in props.nodes) {
      if (props.nodes[nodeId].builders) {
        buildersCount+=props.nodes[nodeId].builders.amount;
      }
    }
  }
  return (
    <React.Fragment>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>Подключено серверов</TableCell>
            <TableCell>{(props.nodes)?Object.keys(props.nodes).length:"Недоступно"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Всего сборщиков</TableCell>
            <TableCell>{(buildersCount>=0)?buildersCount:"Недоступно"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </React.Fragment>
  );
}
