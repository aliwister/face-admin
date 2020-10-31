import Button from "@material-ui/core/Button";
import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Image from "../../components/Image/Image";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";
import {Link} from "react-router-dom";

export const SearchResults = ({data, add }) => {
  if(!data)
    return <div></div>;

  return(
    <>{data.total &&
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
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

          <TableBody>
            {data.items.map(q => (
                <TableRow key={q.id}>
                    <TableCell align="right"><Link to={`/purchase-details/${q.po}`}>{q.po}</Link></TableCell>
                    <TableCell align="right"><Image url={q.image} className="product-image"
                                                    style={{maxWidth: '70px'}}/></TableCell>
                    {q.sku ?
                        <TableCell component="th" scope="row">
                            <a href={`http://www.amazon.com/dp/${q.sku}`} target="_blank">
                                {q.title}
                            </a>
                        </TableCell> : <TableCell component="th" scope="row">
                            {q.title}
                        </TableCell>
                    }
                    <TableCell align="right">{q.quantity}</TableCell>
                    <TableCell align="right">{q.price}</TableCell>
                    <TableCell align="right">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<SaveIcon/>}
                            onClick={()=>add(q)}
                        />
                    </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </>
  );
};