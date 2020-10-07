import React, { useState } from 'react';

import Checkbox from '../../components/CheckBox/CheckBox';
import { useAlert } from "react-alert";

import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {makeStyles} from "@material-ui/core/styles";

import { useCreateHashtagMutation, useHashtagsQuery } from 'codegen/generated/_graphql';
import CreateHashtagDialog from "./components/CreateHashtagDialog";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const statusSelectOptions = [
  { value: 'delivered', label: 'Delivered' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'failed', label: 'Failed' },
];
const limitSelectOptions = [
  { value: 7, label: 'Last 7 orders' },
  { value: 15, label: 'Last 15 orders' },
  { value: 30, label: 'Last 30 orders' },
];

export default function Hashtags() {
  const alert = useAlert();
  const classes = useStyles();
  const [createTagDialog, setCreatetagdialog] = useState(false);
  const [createHashtagMutation] = useCreateHashtagMutation({ context: { clientName: "shopLink" }});
  const [checked, setChecked] = useState({id: null});

  const arrayToObject = (array,prop) =>
    array.map(t => t[prop]);

  const showCreateTagDialog = () => {
    setCreatetagdialog(true);
  };


  const handleCreateTag = async (formData) => {
    const {
      data: {createHashtag},
    }: any = await createHashtagMutation({
      variables: {hashtag: formData}
    });
    if (createHashtag) {
      alert.success(createHashtag.value);
    }
    setChecked({id: null});
    setCreatetagdialog(false);
    refetch();

  };

  const { data, error, refetch, fetchMore } = useHashtagsQuery(
    {
      variables: {
        limit: 15,
        offset: 0,
      },
      context: { clientName: "shopLink" }
  });

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  function update(row) {
    console.log(checked);
    setCreatetagdialog(true);
  }

  const handleClose = () => {
    setCreatetagdialog(false);
  };

  function loadMore() {
    fetchMore({
      variables: {
        offset: data.hashtags.items.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          hashtags: {
            // @ts-ignore
            __typename: prev.hashtags.__typename,
            // @ts-ignore
            items: [...prev.hashtags.items, ...fetchMoreResult.hashtags.items],
            // @ts-ignore
            hasMore: fetchMoreResult.hashtags.hasMore,
          },
        });
      },
    });
  }

/*  function handleLimit({ value }) {
    setLimit(value);
    if (value.length) {
      refetch({
        status: status.length ? [status[0].value] : [],
        limit: value[0].value,
        searchText: ""
      });
    } else {
      refetch({ status: [], limit:10, searchText:"" });
    }
  }*/

/*  function onAllCheck(event) {
    if (event.target.checked) {
      const idx = data && data.transactions.items.map(order => order.id);
      setCheckedId(idx);
    } else {
      setCheckedId([]);
    }
    setChecked(event.target.checked);
  }*/
  function handleCheckbox(row) {

/*    let nextState = checkedId;
    if (!checkedId.includes(value)) {
      nextState = [...checkedId, value]
    } else {
      nextState = checkedId.filter(id => id !== value);
    }*/
    if (row.id == checked.id) {
      setChecked({id: null})
    }
    else
      setChecked(row);
  }

  return (
    <Grid container spacing={1}>

      <Grid  item  md={4} >
      </Grid>
      <Grid item  md={3} style={{textAlign: 'right'}}>
        <Button variant="contained" color="primary" onClick={showCreateTagDialog} >
          Create Hashtag
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>ID</TableCell>
                <TableCell align="left">icon</TableCell>
                <TableCell align="left">EN</TableCell>
                <TableCell align="left">AR</TableCell>
                <TableCell align="left">position</TableCell>
              </TableRow>
            </TableHead>
            {data && data.hashtags.items.length && (
              <TableBody>

                {data.hashtags.items.map(row => (
                  <TableRow key={row.id}>
                    <TableCell align="right"><Checkbox
                      name={row.id}
                      checked={checked.id == row.id}
                      onChange={() => handleCheckbox(row)}
                      overrides={{
                        Checkmark: {
                          style: {
                            borderWidth: '2px',
                            borderRadius: '4px',
                          },
                        },
                      }}
                    /></TableCell>
                    <TableCell component="th" scope="row" onClick={update}>
                      {row.id}
                    </TableCell>
                    <TableCell align="center"><img src={row.icon} style={{width:'40px'}}/></TableCell>
                    <TableCell align="left">{row.en}</TableCell>
                    <TableCell align="left">{row.ar}</TableCell>

                    <TableCell align="left">{row.position}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {data && data.hashtags && data.hashtags.hasMore && (
          <Button onClick={loadMore}>Load More</Button>
        )}
        {createTagDialog && <CreateHashtagDialog item={checked} show={createTagDialog} onClose={handleClose} onSubmit={handleCreateTag} />}
     </Grid>
    </Grid>
  );
}
