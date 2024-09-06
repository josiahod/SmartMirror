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


const SleepTable = ({ sleepData }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Minutes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Object.entries(sleepData).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </TableCell>
                <TableCell align="right">{value.minutes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default SleepTable;