import {flowAPI} from "../../api/config";
import React, {useEffect, useState} from "react";
import Loader from "../../components/Loader/Loader";
import {DialogContent, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {ActionReasonDialog} from "../Orders/components/ActionReasonDialog";
import {ActionDialog} from "./components/ActionDialog";
import Button from "../../components/Button/Button";

const returnFlowState = (data) => (
    <table>

        {
          Object.keys(data).map((key: string) => (
            <tr>
              <td>{key}</td>
              <td>{typeof data[key] === "boolean"? (data[key])?"True":"False":data[key]}</td>
            </tr>
          ))
        }

    </table>
);


export const Actions = ({type}) => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [active, setActive] = useState(null);

  const [actionDialog, setAction] = useState(false);

  useEffect(() => {
    flowAPI.get("/workflow-instance", {params: {type: type, include: "currentStateVariables"}}).then(res => {
      setLoading(false);
      setTickets(res.data);
    });
  }, []);

  if(loading)
    return <Loader/>;


  const onActionStart = (id) => {
    setActive(id);
    setAction(true);
  }

  const onClose = () => {
    setAction(false);
    }


  ;
  return(
    <>
      {actionDialog && <ActionDialog item={active.id} open={actionDialog} onClose={onClose} state={active.state} type={active.type}/>}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>State</TableCell>
            <TableCell>External ID</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>State Vars</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {tickets && tickets.map((row,i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.type}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.state}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.externalId}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.created}
              </TableCell>
              <TableCell component="th" scope="row">
                {returnFlowState(row.stateVariables.requestData)}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                <Button onClick={() => onActionStart(row)}>Action</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>);
}