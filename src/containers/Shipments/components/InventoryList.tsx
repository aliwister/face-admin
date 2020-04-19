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

export const InventoryList = ({data, classes, handleProcess, selected }) => {
  if(!data)
    return <div></div>;

  return(
    <>
      <List>
        {data.inventory.map((a,i) =>
          <ListItem button
                    selected={selected === i}
                    onClick={(event) => handleProcess(event, i)}>
            <ListItemText
              primary={`${a.title} ${a.sku}`}
              secondary= {`${a.quantityOnHand} = ${a.received} - ${a.issued}`}
            />
          </ListItem>
        )}
      </List>
    </>
  );
};