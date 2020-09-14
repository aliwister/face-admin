import styled from "styled-components";
import {Container, Grid, Paper, Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export const OrderInfoPaper = styled(Paper)`
  padding: ${ props  =>  props.theme.spacing(1)}px;
  margin-top: ${ props  =>  props.theme.spacing(2)}px;
  min-height: 200px;
`;

export const ThinTextBox = styled(TextField)`
  size: small;
`;

export const TitleTextField = styled(TextField)`
  input {
    width: '18ch';
  }
`;