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
import SignupForm from "./SignupForm";

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

const tiers = [
    {
        title: 'Just Starting',
        price: '2.5',
        description: ['29 SKUs included', '99 orders / month', '15% commission', 'Whatsapp support'],
        buttonText: 'Sign up',
        buttonVariant: 'outlined',
    },
    {
        title: 'SMEs',
        subheader: 'Most popular',
        price: '20',
        description: [
            '199 SKUs included',
            'Unlimited Orders',
            '12% commission on sales',
            'Phone support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '220',
        description: [
            '1999 SKUs included',
            'Unlimited Orders',
            '8% commission on sales',
            'Priority Phone support',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Features',
        description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

export default function Signup() {
    const classes = useStyles();
    const [form, setForm] = useState(false);

  function showForm() {
    setForm(true);
  }

  return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        <a href='https://www.badals.com'>
                            <LogoImage src={Logoimage} alt='badals-admin' />
                        </a>

                    </Typography>
                    {/*<nav>*/}
                    {/*    <Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                    {/*        Features*/}
                    {/*    </Link>*/}
                    {/*    <Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                    {/*        Enterprise*/}
                    {/*    </Link>*/}
                    {/*    <Link variant="button" color="textPrimary" href="#" className={classes.link}>*/}
                    {/*        Support*/}
                    {/*    </Link>*/}
                    {/*</nav>*/}
                    <Link to='/'>
                    <Button href="#" color="primary" variant="outlined" className={classes.link} >
                        Login
                    </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
          {form?

              <SignupForm />

            :
            <>
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    <center>
                            <LogoImage src={Logoimage} alt='badals-admin' />
                        </center>
                </Typography>


                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Open up your business to a large customer base in Oman and abroad.
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <LocalShippingIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Easy Delivery"
                                secondary='With order tracking from pickup to customer delivery'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PaymentIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Multiple payment options"
                                secondary='Payment options for your customers, and direct deposit to your bank account'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <LoyaltyIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Rewards Program"
                                secondary='Increase return sales through automatic enrollment'
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <FaceIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Largest customer base"
                                secondary="Over 1K daily active users, with top Alexa ranking among local e-commerce"
                            />
                        </ListItem>
                    </List>
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {tiers.map((tier) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Pro' ? <StarIcon /> : null}
                                    className={classes.cardHeader}
                                />
                                <CardContent>
                                    <div className={classes.cardPricing}>
                                        <Typography component="h2" variant="h3" color="textPrimary">
                                            {tier.price}<Typography component="subtitle1">OMR</Typography>
                                        </Typography>
                                        <Typography variant="h6" color="textSecondary">
                                            /mo
                                        </Typography>
                                    </div>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant} color="primary" onClick={showForm}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            </>}
            {/* Footer */}
            <Container maxWidth="md" component="footer" className={classes.footer}>
                {/*<Grid container spacing={4} justify="space-evenly">*/}
                {/*    {footers.map((footer) => (*/}
                {/*        <Grid item xs={6} sm={3} key={footer.title}>*/}
                {/*            <Typography variant="h6" color="textPrimary" gutterBottom>*/}
                {/*                {footer.title}*/}
                {/*            </Typography>*/}
                {/*            <ul>*/}
                {/*                {footer.description.map((item) => (*/}
                {/*                    <li key={item}>*/}
                {/*                        <Link href="#" variant="subtitle1" color="textSecondary">*/}
                {/*                            {item}*/}
                {/*                        </Link>*/}
                {/*                    </li>*/}
                {/*                ))}*/}
                {/*            </ul>*/}
                {/*        </Grid>*/}
                {/*    ))}*/}
                {/*</Grid>*/}
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}