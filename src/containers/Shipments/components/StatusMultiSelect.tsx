import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import {Grid} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 650,
  },
  button: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: 2,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  'PENDING',
  'SHIPPED',
  'RECEIVED',
  'DELIVERED',
  'CANCELED',
  'FAILED',
  'PROCESSING',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
export const StatusMultiSelect = ({handleStatus, theme, status}) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-mutiple-chip-label">Status</InputLabel>
      <Select
        fullWidth
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={status}
        onChange={handleStatus}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected: any) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem key={name} value={name} style={getStyles(name, status, theme)}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
