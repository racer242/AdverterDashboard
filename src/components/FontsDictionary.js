import React, {useState} from 'react';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  searchInput: {
    marginTop:  theme.spacing(2),
    marginBottom:  theme.spacing(4),
  },
  searchLabel: {
    color:theme.palette.text.secondary,
  },
}));

export default function FontsDictionary(props) {
  const classes = useStyles();
  const [searchInput, setSearchInput] = useState('');

  props.dictionary.sort();

  const changeHandler = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <TextField
        className={classes.searchInput}
        id="input-with-icon-textfield"
        label="Быстрый поиск"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" className={classes.searchLabel}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={changeHandler}
      />

      <Table size="small">
        <TableBody>
          {
            props.dictionary.map((font,i) => {
              if ((font.toLowerCase().indexOf(searchInput)>=0)||(searchInput.toLowerCase()=="")) {
                return (
                  <TableRow
                    key={"font"+i}
                  >
                    <TableCell>{font}</TableCell>
                  </TableRow>
                )
              }
              return []
            })
          }
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
