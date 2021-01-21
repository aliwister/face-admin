import { flowAPI } from "../../../api/config";
import React, {useEffect, useState} from "react";
import Loader from "../../../components/Loader/Loader";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Moment from "react-moment";

/*interface HistoryProps {
  item: string;
  open: boolean;
  onClose: () => void;
}*/


export const HistoryDialog = ({item, open, onClose})  => {
  const [loading, setLoading] = useState(true);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    flowAPI.get(`/workflow-instance/id/${item}?include=actions`).then(res => {
      setLoading(false);
      setActions(res.data.actions);
    });
  }, []);

  if(loading)
    return <Loader/>;

  return(
      <Dialog open={open}  onClose={onClose}  aria-labelledby="form-dialog-title">
        <DialogContent style={{height: "350px", width: "700px"}}>
          <DialogContentText>
            Action History from new to old
          </DialogContentText>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {actions && actions.map((row,i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Moment date={row.executionStartTime} format="YYYY-MM-DD T HH:mm">
                  1976-04-19 12:59
                </Moment>

              </TableCell>
              <TableCell component="th" scope="row">
                <Chip label={row.state} color="primary"/>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.stateText}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </DialogContent>
      </Dialog>
);
}