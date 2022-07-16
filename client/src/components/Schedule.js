import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel } from '@material-ui/core';
import lufthansa from '../logos/lufthansa.png';
import emirates from '../logos/emirates.png';
import delta from '../logos/delta.png';
import qatar from '../logos/qatar.png';
import british from '../logos/british.png';
import france from '../logos/france.png';
import singapore from '../logos/singapore.png';
import united from '../logos/united.png';

function Schedule() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const url = new URL('http://localhost:4000/schedule');
        const data = await fetch(url);
        const items = await data.json();
        setItems(items);
    };

    const [rowData, setRowData] = useState(items);
    const [orderDirection, setOrderDirection] = useState('asc');
    
    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case 'asc':
                return arr.sort((a, b) => new Date(a.date_time) > new Date(b.date_time) ? 1 : -1);
            case 'desc':
                return arr.sort((a, b) => new Date(a.date_time) < new Date(b.date_time) ? 1 : -1);
        }
    };
      
    const handleSortRequest = () => {
        setRowData(sortArray(items, orderDirection));
        setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    };

    const map = {
        'Lufthansa': lufthansa,
        'Emirates': emirates,
        'Delta Airlines': delta,
        'Qatar Airways': qatar,
        'British Airways': british,
        'Air France': france,
        'Singapore Airlines': singapore,
        'United Airlines': united
    };

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'><h2>Airline</h2></TableCell>
                        <TableCell align='center'><h2>Flight No.</h2></TableCell>
                        <TableCell align='center'><h2>From</h2></TableCell>
                        <TableCell align='center' onClick={handleSortRequest}>
                            <TableSortLabel active={true} direction={orderDirection}>
                                <h2>Arrival</h2>
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map(item => (
                        <TableRow>
                            <TableCell align='center'><img src={map[item.airline]}></img></TableCell>
                            <TableCell align='center'>{item.flight_no}</TableCell>
                            <TableCell align='center'>{item.from_city}</TableCell>
                            <TableCell align='center'>{new Date(item.date_time).toString().substring(4,21)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Schedule;