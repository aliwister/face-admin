import styled from "styled-components";
import {Container, Grid, Paper, Button} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";

export const HookInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-bottom: 10px;
  font-size: 14px;
`;

export const ThinTextBox = styled(TextField)`
  size: small;
`;

export const TitleTextField = styled(TextField)`
  input {
    width: '18ch';
  }
`
export const SectionCard = styled(Card)`
  padding: ${ props  =>  props.theme.spacing(1)}px;
  margin-bottom: ${ props  =>  props.theme.spacing(1)}px;
  

  .MuiCardHeader-root {
    padding: 0px;
  }
`
;