import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, CssBaseline, Typography, makeStyles, Button } from '@material-ui/core';
import airplane from '../logos/airplane.png';

function Navbar() {
    const useStyles = makeStyles((theme) => ({
        navlinks: {
            marginLeft: theme.spacing(10),
            display: 'flex',
        },
        logo: {
            flexGrow: '1',
        },
        link: {
            textDecoration: 'none',
            color: 'white',
            fontSize: '20px',
            marginLeft: theme.spacing(5)
        },
        icon: {
            marginRight: theme.spacing(2),
        }
      }));
      
    const classes = useStyles();

    return (
        <AppBar position='static'>
            <CssBaseline />
            <Toolbar>
                <Typography variant='h4' className={classes.logo}>
                    <img src={airplane} className={classes.icon} />
                    Air Traffic Management System
                </Typography>
                <div className={classes.navlinks}>
                    <Link to='/' className={classes.link}>
                        <Button variant='contained' color='primary'>Login</Button>
                    </Link>
                    <Link to='/schedule' className={classes.link}>
                        <Button variant='contained' color='primary'>Schedule</Button>
                    </Link>
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;