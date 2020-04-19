import Button from "@material-ui/core/Button";
import {
  Grid,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";
import Image from "../../../components/Image/Image";
import SaveIcon from "@material-ui/icons/Save";
import React from "react";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import {SectionCard} from "../Shipment.style";
import Checkbox from "@material-ui/core/Checkbox";

export const InventoryList = ({data, classes, handleSelect, selected }) => {
  if(!data)
    return <div></div>;
  const isSelected = (name) => selected.indexOf(name) !== -1;
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
          {data.inventory &&
          <TableBody>
            {data.inventory.map(q => {
                const isItemSelected = isSelected(q.productId);
                return (
                  <TableRow hover
                            onClick={(e) => handleSelect(e, q.productId)}
                            key={q.productId}>
                    <TableCell><Checkbox
                      checked={isItemSelected}
                    /></TableCell>
                    <TableCell align="right">{q.productId}</TableCell>
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
                    <TableCell align="right">{q.quantityOnHand}</TableCell>
                    <TableCell align="right">{q.sku}</TableCell>
                  </TableRow>
                )
              }
            )}
          </TableBody>}
        </Table>
      </TableContainer>
    </>
  );
};