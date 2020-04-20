import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import PaymentIcon from '@material-ui/icons/Payment';
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import FaceIcon from '@material-ui/icons/Face';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Logoimage from '../../image/logo.svg';
import {LogoImage} from "../Layout/Topbar/Topbar.style";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.badals.com/">
        Badals.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


export default function SignupForm() {
  const classes = useStyles();
  const [form, setForm] = useState(false);

  function showForm() {
    setForm(true);
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/v2.js';
    document.body.appendChild(script);

    script.addEventListener('load', () => {
      if(window.hbspt) {
        window.hbspt.forms.create({
          portalId: '7542485',
          formId: '31b70762-2a55-4912-b818-fceacc026ee6',
          target: '#hubspotForm'
        })
      }
    });
  },[]);

  return (
    <React.Fragment>
      <br/>

      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography variant="h5" align="center" color="textSecondary">
          Tell us a little bit about yourself
        </Typography>
        <br/><br/>
      <div id="hubspotForm"></div>
      </Container>
    </React.Fragment>
  );
}