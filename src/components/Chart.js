import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Legend } from 'recharts';
import Title from './Title';
import numbro from 'numbro';

export default function Chart(props) {
  const theme = useTheme();

  let data=[];
  for (let i = 0; i < props.data.length; i++) {
    let element=props.data[i];
    data.push(
      {
        ...element,
        t:numbro(element.t).format({output: "time"})
      }
    )
  }

  let colors=[theme.palette.primary.main,"orange","red","grey"];
  if (props.colors) colors=props.colors;

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          { (
              ()=>{
                if (props.legend) {
                  return (<Legend verticalAlign="top"/>)
                }
                return []
              }
            )()
          }
          <XAxis dataKey={props.xKey} stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary} />
          {
            props.yKey.map(
              (yKey,i) => (
                <Line key={"line"+i} type="monotone" dataKey={yKey} stroke={colors[i]} name={(props.yNames)?props.yNames[i]:""} dot={false} isAnimationActive={false} />
              )
            )
          }
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
