import Button from "@material-ui/core/Button";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Image from "../../../components/Image/Image";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";

export const PrepQueue = ({queue, classes, handleProcess }) => {
  if(!queue)
    return <div></div>;

  console.log(queue);

  return(
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell></TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="right">Qty</TableCell>
                <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          {queue &&
          <TableBody>
            {queue.map(q => (
                <TableRow key={q.id}>
                    <TableCell align="right">{q.id}</TableCell>
                    <TableCell align="right"><Image url={q.image} className="product-image"
                                                    style={{maxWidth: '70px'}}/></TableCell>
                    {q.sku ?
                        <TableCell component="th" scope="row">
                            <a href={`http://www.amazon.com/dp/${q.sku}`} target="_blank">
                                {q.description}
                            </a>
                        </TableCell> : <TableCell component="th" scope="row">
                            {q.description}
                        </TableCell>
                    }
                    <TableCell align="right">{q.unpacked}</TableCell>
                    <TableCell align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon/>}
                            onClick={()=>handleProcess(q)}
                        />
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>}
        </Table>
      </TableContainer>
    </>
  );
};