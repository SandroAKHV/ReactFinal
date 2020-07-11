import React, { useState } from 'react';
import Api from '../../services/service';
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const CreateUser = () => {

    const api = new Api();
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: ' 47%;',
            },
        },
    }));



    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const onJobChange = (event) => {
        setJob(event.target.value);
    }


    const onSubmit = (event) => {
        event.preventDefault();
        api.postData({ name, job }, 'users')
            .then((res) => {
                alert(`Id: ${res.id}\nDate: ${res.createdAt}`);
            });
    }
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
            <h1>Add Person</h1>

            <TextField id="standard-basic" label="Enter name" type="text"
                onChange={onNameChange}
                value={name} />
            <TextField id="standard-basic" label="Enter Job" type="text"
                onChange={onJobChange}
                value={job} />
            <div style={{ margin: '0 auto' }}>
                <button
                    className="btn"
                >
                    Add </button>
            </div>
        </form>


    );
}

export default CreateUser;
