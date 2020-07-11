import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Api from '../../service/service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const ListUsers = ({ updateUser }) => {
    const api = new Api();
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        api.getUsers(1)
            .then(res => {
                setUsers(res.data);
                setTotalPages(res.total);
            });
    }, [totalPages]);

    useEffect(() => {
        for (let i = 2; i <= totalPages; i++) {
            api.getUsers(i)
                .then(res => {
                    setUsers(prevUsers => {
                        return [...prevUsers, ...res.data];
                    });
                });
        }
    }, [totalPages]);
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    const classes = useStyles();

    const deleteUser = (id) => {
        api.deleteUser(id)
            .then(res => {
                alert(`Status: ${res.status}`);
            });
        setUsers((usersPrev) => {
            const idx = usersPrev.findIndex(item => item.id === id);
            return [...usersPrev.slice(0, idx), ...usersPrev.slice(idx + 1)];
        });
    }
    const tableRows = users.map((user) => {
        return (

            <TableRow key={user.id}>

                <TableCell align="right">{user.id}</TableCell>
                <TableCell align="right"><img src={user.avatar} alt="No avatar" /></TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.first_name}.{user.last_name}</TableCell>
                <TableCell align="right"> <button type="button" className="btn-delete btn"
                    onClick={() => { deleteUser(user.id) }}>
                    Delete
                    </button>
                    <button type="button" className="btn"
                        onClick={() => { updateUser(user.id) }}
                    >
                        Update
                    </button></TableCell>
            </TableRow>

        );
    });

    return (
        <div className="country-sum">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Avatar</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">First/Last Name</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableRows}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );

}

export default ListUsers;