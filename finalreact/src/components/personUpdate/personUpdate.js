import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Api from '../../service/service';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const UpdateUser = ({ updatedPersonId }) => {

    const api = new Api();

    const history = useHistory();
    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const Name = (event) => {
        setName(event.target.value);
    }
    const Job = (event) => {
        setJob(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        api.updateUser({ name, job }, updatedPersonId)
            .then((res) => {
                alert(`Updated at: ${res.updatedAt}`);
            });
        history.push('/');
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: ' 47%;',
            },
        },
    }));



    const classes = useStyles();
    return (

        <form className={classes.root} noValidate autoComplete="off" onSubmit={onSubmit}>
            <h1>Update User</h1>

            <TextField id="standard-basic" label="Enter name" type="text"
                onChange={Name}
                value={name} />
            <TextField id="standard-basic" label="Enter Job" type="text"
                onChange={Job}
                value={job} />
            <div style={{ margin: '0 auto' }}>
                <button
                    className="btn"
                >
                    Update Person </button>
            </div>

        </form>

    );
}

export default UpdateUser;