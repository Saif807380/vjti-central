import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  table: {
    minWidth: 600,
  },
});

function createData(title, domain) {
  return { title, domain };
}

const rows = [
  createData('Error 404 Hackathon', 'Hackathon'),
  createData('Girlscript Codeathon', 'Competition'),

];


const ApplicationsList = () => {

  const classes = useStyles();

  return (
    <div className="container">
      <div className="py-4">
        <h1>Applications Page</h1>
        <br></br>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">

            <TableHead>
              <TableRow>
                <TableCell >Title</TableCell>
                <TableCell >Domain </TableCell>
                <TableCell >Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.title}>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell >{row.domain}</TableCell>
                  <TableCell >

                    <Button
                      style={{ backgroundColor: '#12824C', color: '#FFFFFF' }}
                      to={`/users/${12}`} >Accepted </Button>
                    {/* <Button
//                     style={{ backgroundColor: '#b22a00', color: '#FFFFFF' }}
//                     >Rejected</Button> */}
                    &nbsp;
                    &nbsp;
                    <Button
                      style={{ backgroundColor: '#212529', color: '#FFFFFF' }}
                      to={`/users/${12}`} >Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}


export default ApplicationsList;
