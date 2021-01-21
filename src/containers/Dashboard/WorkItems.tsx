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
import Chip from "@material-ui/core/Chip";
import BuildIcon from '@material-ui/icons/Build';
import HistoryIcon from '@material-ui/icons/History';
import IconButton from "@material-ui/core/IconButton";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import {HistoryDialog} from "./components/HistoryDialog";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {USERS_ALL} from "../Shipments/components/Constants";
import Avatar from "@material-ui/core/Avatar";
import TimeAgo from 'react-timeago';

const summarize = (data, type) => {
  if(type==="returnWorkflow")
    return <><Chip label={data.reason} color="secondary"/> {data.quantity}x {data.productName.substr(0,25)} </>;
  if(type==="refundWorkflow")
    return <>Details</>;
}

const getUser = (email) => {
  const by = USERS_ALL.find(i => i.value === email);
  if (by)
    return       <Chip
      avatar={<Avatar>{by.label.substring(0,1)}</Avatar>}
      label={by.label}
      variant="outlined"
      color="secondary"
    />
  return "";
}

const returnFlowState = (data) => (
    <table>
        {
          Object.keys(data).map((key: string) => (
            <tr>
              <td>{key}</td>
              {typeof data[key] === "string" && data[key].startsWith("http")?
                <td><a href ={data[key]} target="_blank">{data[key]}</a></td>:
              <td>{typeof data[key] === "boolean"? (data[key])?"True":"False":data[key]}</td>}
            </tr>
          ))
        }
    </table>
);
const returnLabelSummaryState = (data) => (
  <><Chip label={data.carrier} /><Tracking trackingNum={data.trackingNum} label ={data.trackingNum} carrier={data.carrier} /></>
);
const returnLabelDetailsState = (data) => (
    <table>
      {data.labelFile && <tr>
        <td>labelFile</td>
        <td>{data.labelFile}</td>
      </tr>}
      {data.weight && <tr>
        <td>weight</td>
        <td>{data.weight}</td>
      </tr>}
      {data.returnFee && <tr>
        <td>returnFee</td>
        <td>{data.returnFee}</td>
      </tr>}

    </table>
);

const returnReplacementOrderState = (data) => (
    <Link to={`/order-details/${data.ref}`} target="_blank"> {data.ref} </Link>
);

interface WorkItemProps {
  type?: string,
  businessKey?: string
}


export const WorkItems = (props) => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [active, setActive] = useState(null);

  const [actionDialog, setAction] = useState(false);
  const [assignDialog, setAssign] = useState(false);
  const [historyDialog, setHistory] = useState(false);


  useEffect(() => {
    let params = {};
    if(props.type)
      params['type'] = props.type;
    if(props.businessKey)
      params['businessKey'] = props.businessKey;
    params['include'] = "currentStateVariables";

    flowAPI.get("/workflow-instance", {params}).then(res => {
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
  const onHistoryStart = (id) => {
    setActive(id);
    setHistory(true);
  }

  const onClose = () => {
    setAction(false);
    setAssign(false);
    setHistory(false);
    setActive(null);
  }

  return(
    <>
      {actionDialog && <ActionDialog item={active.id} open={actionDialog} onClose={onClose} step={active.state} type={active.type}/>}
      {assignDialog && <AssignDialog item={active.id} open={assignDialog} onClose={onClose} step={active.state} type={active.type} state={active.stateVariables.requestData}/>}
      {historyDialog && <HistoryDialog item={active.id} open={historyDialog} onClose={onClose} />}
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Bus Key</TableCell>
{/*            <TableCell>External ID</TableCell>*/}
            <TableCell>Created</TableCell>
            <TableCell>State Vars</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {tickets && tickets.map((row,i) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {getUser(row.stateVariables.assignedTo)}
              </TableCell>
              <TableCell component="th" scope="row">
                <Chip label={row.state} color="primary"/>
              </TableCell>
              <TableCell component="th" scope="row">
                <Link to={`order-details/${row.businessKey}`} target="_blank"> {row.businessKey} </Link>
              </TableCell>
{/*              <TableCell component="th" scope="row">
                {row.externalId}
              </TableCell>*/}
              <TableCell component="th" scope="row">
                <TimeAgo date={row.created} />
              </TableCell>
              <TableCell component="th" scope="row">
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <Typography>{summarize(row.stateVariables.requestData, row.type)}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {returnFlowState(row.stateVariables.requestData)}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                {row.stateVariables.label && Object.keys(row.stateVariables.label).length && returnLabelSummaryState(row.stateVariables.label) &&
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <Typography>Return Info {returnLabelSummaryState(row.stateVariables.label)}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    {returnLabelDetailsState(row.stateVariables.label)}
                  </ExpansionPanelDetails>
                </ExpansionPanel>}
                {row.stateVariables.replacement && Object.keys(row.stateVariables.replacement).length &&
                <ExpansionPanel>
                  <ExpansionPanelSummary>
                    <Typography>Replacement Order {returnReplacementOrderState(row.stateVariables.replacement)}</Typography>
                  </ExpansionPanelSummary>
                </ExpansionPanel>}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                  <IconButton size="medium" onClick={() => onActionStart(row)} disabled={row.state === 'done'}><BuildIcon /></IconButton>
                  <IconButton size="medium" onClick={() => onAssignStart(row)}  disabled={row.state === 'done'}><AssignmentIndIcon /></IconButton>
                  <IconButton size="medium" onClick={() => onHistoryStart(row)}><HistoryIcon /></IconButton>
                </ButtonGroup>
              </TableCell>
{/*              <TableCell component="th" scope="row" align="right">
                <Button onClick={() => onAssignStart(row)}>Assign</Button>
              </TableCell>*/}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>);
}