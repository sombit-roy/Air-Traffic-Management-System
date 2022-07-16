import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from'axios';
import { Button, TextField, Paper, Typography, makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

function Home(props) {
    const navigate = useNavigate();

    const [pilot_id, setPilot_id] = useState(0);
    const [pilot_name, setPilot_name] = useState('');
    const [airline, setAirline] = useState('');
    const [flight_no, setFlight_no] = useState();
    const [from_city, setFrom_city] = useState('');
    const [arrival, setArrival] = useState(new Date());
    const [formInput, setFormInput] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        const url = new URL('http://localhost:4000/addEntry')
        Axios.post(url, {
            pilot_id: pilot_id,
            pilot_name: pilot_name,
            airline: airline,
            flight_no: flight_no,
            from_city: from_city,
            arrival: arrival
        }).then(() => {
            setFormInput([...formInput,
                {
                    pilot_id: pilot_id,
                    pilot_name: pilot_name,
                    airline: airline,
                    flight_no: flight_no,
                    from_city: from_city,
                    arrival: arrival
                },
            ]);
        });
        navigate('/schedule');
    };

    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(2)
        },
        root: {
            padding: theme.spacing(3, 2),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexWrap: 'wrap'
        },
        textField: {
            margin: theme.spacing(1,0,1,0),
            width: 400
        },
        dropdown: {
            margin: theme.spacing(2,0,1,0),
            width: 400
        },
        datetime: {
            margin: theme.spacing(2,0,1,0),
            width: 400
        }
        }));

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography variant='h5'>{props.formName}</Typography>
            <form className='container' onSubmit={handleSubmit}>
                <div><TextField
                    label='Pilot ID'
                    id='margin-normal'
                    name='pilot_id'
                    className={classes.textField}
                    onChange={e => {setPilot_id(e.target.value)}}
                /></div>

                <div><TextField
                    label='Pilot Name'
                    id='margin-normal'
                    name='pilot_name'
                    className={classes.textField}
                    onChange={e => {setPilot_name(e.target.value)}}
                /></div>

                <div><FormControl fullWidth>
                        <InputLabel>Airline</InputLabel>
                        <Select
                        label='Airline'
                        id='margin-normal'
                        className={classes.dropdown}
                        onChange={e => {setAirline(e.target.value)}}
                        >
                            <MenuItem value={'Lufthansa'}>Lufthansa</MenuItem>
                            <MenuItem value={'Emirates'}>Emirates</MenuItem>
                            <MenuItem value={'Delta Airlines'}>Delta Airlines</MenuItem>
                            <MenuItem value={'Qatar Airways'}>Qatar Airways</MenuItem>
                            <MenuItem value={'British Airways'}>British Airways</MenuItem>
                            <MenuItem value={'Air France'}>Air France</MenuItem>
                            <MenuItem value={'Singapore Airlines'}>Singapore Airlines</MenuItem>
                            <MenuItem value={'United Airlines'}>United Airlines</MenuItem>
                    </Select>
                </FormControl></div>

                <div><TextField
                    label='Flight No.'
                    id='margin-normal'
                    name='flight_no'
                    className={classes.textField}
                    onChange={e => {setFlight_no(e.target.value)}}
                /></div>

                <div><TextField
                    label='City'
                    id='margin-normal'
                    name='from_city'
                    className={classes.textField}
                    onChange={e => {setFrom_city(e.target.value)}}
                /></div>

                <div><MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                    value={arrival}
                    id='margin-normal'
                    label='Arrival'
                    onChange={date => setArrival(date)}
                    ampm={false}
                    className={classes.datetime}
                /></MuiPickersUtilsProvider></div>

                <div><Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.button}
                >
                    Submit
                </Button></div>
            </form>
        </Paper>
    );
}

export default Home;