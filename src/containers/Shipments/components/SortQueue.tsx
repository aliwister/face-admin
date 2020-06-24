import Button from "@material-ui/core/Button";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Image from "../../../components/Image/Image";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";
import {Link} from "react-router-dom";

export const SortQueue = ({data, classes, handleProcess }) => {
  if(!data)
    return <div></div>;

  return(
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell></TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Link</TableCell>
            </TableRow>
          </TableHead>
          {data.sortQueue &&
          <TableBody>
            {data.sortQueue.map(q => (
                <TableRow key={q.id}>
                    <TableCell align="right"><Link to={`/purchase-details/${q.po}`}>{q.po}</Link></TableCell>
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
                    <TableCell align="right">{q.quantity}</TableCell>
                    <TableCell align="right">{q.price}</TableCell>
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