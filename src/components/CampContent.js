import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = makeStyles((theme) => ({
  container: {
  },
}));

export default function CampContent(props) {

  const classes = useStyles();

  let campId=props.client+"/"+props.camp;

  let camp=null;
  for (let i = 0; i < props.reports.length; i++) {
    if (props.reports[i].name==campId) {
      camp=props.reports[i];
      break;
    }
  }

  if (!camp) {
    return [];
  }

  let campName=props.camp;



  let creatives=[];


  switch (props.feature) {

    case "section": {
      for (let name in camp.creatives) {
        let creative=camp.creatives[name];
        if (props.subject==creative.section) {
          creatives.push(creative);
        }
      }
      break;
    }

    case "publisher": {
      for (let name in camp.creatives) {
        let creative=camp.creatives[name];
        if (props.subject==creative.publisher) {
          creatives.push(creative);
        }
      }
      break;
    }

    case "platform": {
      for (let name in camp.creatives) {
        let creative=camp.creatives[name];
        if (props.subject==creative.platform) {
          creatives.push(creative);
        }
      }
      break;
    }

    case "feed": {
      for (let name in camp.creatives) {
        let creative=camp.creatives[name];
        if (props.subject==creative.feed) {
          creatives.push(creative);
        }
      }
      break;
    }

    case "format": {
      for (let name in camp.creatives) {
        let creative=camp.creatives[name];
        if (props.subject==((creative.format.isRubber)?`100Px${creative.format.height}_${creative.format.width}`:`${creative.format.width}x${creative.format.height}`)) {
          creatives.push(creative);
        }
      }
      break;
    }

    case "creatives": {
      creatives=Object.values(camp.creatives);
      break;
    }

    default:

  }

  creatives.sort((a,b)=>{
    if (a.section>b.section) return 1;
    if (a.section<b.section) return -1;
    if (a.publisher>b.publisher) return 1;
    if (a.publisher<b.publisher) return -1;
    if (a.platform>b.platform) return 1;
    if (a.platform<b.platform) return -1;
    if (a.feed>b.feed) return 1;
    if (a.feed<b.feed) return -1;
    if ((!a.format)||(!b.format)) return -1;
    let am=(a.format.width*a.format.height);
    let bm=(b.format.width*b.format.height);
    if (am>bm) return 1;
    if (am<bm) return -1;
    if (a.format.width>b.format.width) return 1;
    if (a.format.width<b.format.width) return -1;
    if (a.format.height>b.format.height) return 1;
    if (a.format.height<b.format.height) return -1;
    if (a.name>b.name) return 1;
    if (a.name<b.name) return -1;
    return -1;
  })

  return (
    <React.Fragment>
      <Title>{props.title}</Title>

      <TableContainer className={classes.container}>
        <Table size="small" stickyHeader>
          <TableHead >
            <TableRow>
              <TableCell>Формат</TableCell>
              <TableCell>Раздел</TableCell>
              <TableCell>Площадка</TableCell>
              <TableCell>Платформа</TableCell>
              <TableCell>Фид</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              creatives.map((creative,i) => {
                return (
                  <TableRow key={"creative"+i}>
                    <TableCell>{creative.format.width+"x"+creative.format.height}</TableCell>
                    <TableCell>{creative.section}</TableCell>
                    <TableCell>{creative.publisher}</TableCell>
                    <TableCell>{creative.platform}</TableCell>
                    <TableCell>{creative.feed}</TableCell>
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
