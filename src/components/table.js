import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      margin: '20px auto', // Adjust margin as needed
      maxWidth: 600,
    },
    table: {
      minWidth: 300,
    },
  });

  
const ReactTable  = ({ data }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table} aria-label="leaderboard table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Steps</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.steps}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default ReactTable