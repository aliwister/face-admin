import {flowAPI} from "../../api/config";
import React, {useEffect, useState} from "react";
import Loader from "../../components/Loader/Loader";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {ActionDialog} from "./components/ActionDialog";
import Button from "../../components/Button/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import {AssignDialog} from "./components/AssignDialog";
import {Tracking} from "../../components/Tracking/Tracking";
import {Link} from "react-router-dom";

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
const returnLabelState = (data) => (
    <table>

            <tr>
              <td>Track</td>
              <td><Tracking trackingNum={data.trackingNum} label ={data.trackingNum} carrier={data.carrier} /></td>
            </tr>

    </table>
);

const returnReplacementOrderState = (data) => (
    <table>

            <tr>
              <td>Replacement Order</td>
              <td><Link to={`${data.ref}`}> {data.ref} </Link></td>
            </tr>

    </table>
);

export const Actions = ({type}) => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [active, setActive] = useState(null);

  const [actionDialog, setAction] = useState(false);
  const [assignDialog, setAssign] = useState(false);


  useEffect(() => {
    flowAPI.get("/workflow-instance", {params: {type: type, include: "currentStateVariables"}}).then(res => {
      setLoading(false);
      setTickets(res.data);
    });
  }, [!active]);

  if(loading)
    return <Loader/>;

  const onActionStart = (id) => {
    setActive(id);
    setAction(true);
  }

  const onAssignStart = (id) => {
    setActive(id);
    setAssign(true);
  }

  const onClose = () => {
    setAction(false);
    setAssign(false);
    setActive(null);
  }

  return(
    <>
      {actionDialog && <ActionDialog item={active.id} open={actionDialog} onClose={onClose} step={active.state} type={active.type}/>}
      {assignDialog && <AssignDialog item={active.id} open={assignDialog} onClose={onClose} step={active.state} type={active.type} state={active.stateVariables.requestData}/>}
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
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <Typography>Details</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {returnFlowState(row.stateVariables.requestData)}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {row.stateVariables.label && Object.keys(row.stateVariables.label).length && returnLabelState(row.stateVariables.label) &&
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <Typography>Shipping Info</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {returnLabelState(row.stateVariables.label)}
                  </ExpansionPanelDetails>
                </ExpansionPanel>}
                {row.stateVariables.replacement && Object.keys(row.stateVariables.replacement).length &&
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <Typography>Replacement Order </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {returnReplacementOrderState(row.stateVariables.replacement)}
                  </ExpansionPanelDetails>
                </ExpansionPanel>}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                <Button onClick={() => onActionStart(row)}>Action</Button>
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                <Button onClick={() => onAssignStart(row)}>Assign</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>);
}