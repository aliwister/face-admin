import styled from "styled-components";
import {Container, Grid, Paper, Button} from "@material-ui/core";

export const OrderInfoPaper = styled(Paper)`
  padding: ${ props  =>  props.theme.spacing(1)}px;
  margin-top: ${ props  =>  props.theme.spacing(2)}px;
  height: 310px;
`;