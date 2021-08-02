import React from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Paper from '@material-ui/core/Paper';

import clsx from 'clsx';

import numbro from 'numbro';

const useStyles = makeStyles({
  container: {
    height: 380,
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
            children
      )}
    </div>
  );
}

export default function BuildingState(props) {

  const [value, setValue] = React.useState('builders');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  let buildingTasks={}
  for (let i = 0; i < props.tasks.length; i++) {
    buildingTasks[props.tasks[i].id]={
      ...props.tasks[i]
    }
  }

  return (
    <React.Fragment>
      <Title>{props.title}</Title>

      <Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
        <Tab
          value="builders"
          label="Сборщики"
          wrapped
        />
        <Tab
          value="tasks"
          label="Задачи"
        />
      </Tabs>
      <TabPanel value={value} index="builders">

        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader>
            <TableHead >
              <TableRow>
                <TableCell>Сборщик</TableCell>
                <TableCell>Задача</TableCell>
                <TableCell>Клиент</TableCell>
                <TableCell>Кампания</TableCell>
                <TableCell>Раздел</TableCell>
                <TableCell>Креатив</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              props.builders.map(
                (builder,i) => (
                  <TableRow key={"builders_"+i}>
                    <TableCell>{builder.id}</TableCell>
                    <TableCell>{builder.taskId}</TableCell>
                    <TableCell>{(buildingTasks[builder.taskId])?buildingTasks[builder.taskId].creative.client:""}</TableCell>
                    <TableCell>{(buildingTasks[builder.taskId])?buildingTasks[builder.taskId].creative.camp:""}</TableCell>
                    <TableCell>{(buildingTasks[builder.taskId])?buildingTasks[builder.taskId].creative.section:""}</TableCell>
                    <TableCell>{(buildingTasks[builder.taskId])?buildingTasks[builder.taskId].creative.name:""}</TableCell>
                  </TableRow>
                )
              )
            }
            </TableBody>
          </Table>
        </TableContainer>

      </TabPanel>
      <TabPanel value={value} index="tasks">

        <TableContainer className={classes.container}>
          <Table size="small" stickyHeader>
            <TableHead >
              <TableRow>
                <TableCell>Задача</TableCell>
                <TableCell>Сборщик</TableCell>
                <TableCell>Клиент</TableCell>
                <TableCell>Кампания</TableCell>
                <TableCell>Раздел</TableCell>
                <TableCell>Креатив</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {
              props.tasks.map(
                (task,i) => (
                  <TableRow key={"tasks_"+i}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.builderId}</TableCell>
                    <TableCell>{task.creative.client}</TableCell>
                    <TableCell>{task.creative.camp}</TableCell>
                    <TableCell>{task.creative.section}</TableCell>
                    <TableCell>{task.creative.name}</TableCell>
                  </TableRow>
                )
              )
            }
            </TableBody>
          </Table>
        </TableContainer>

      </TabPanel>

    </React.Fragment>
  );
}
