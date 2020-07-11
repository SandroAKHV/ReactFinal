import React, { useState } from 'react';
import { Route, useHistory } from 'react-router-dom';

import axios from 'axios'

import CreateUser from '../addPerson/addUser';
import ListUsers from '../persons/person';

import UpdateUser from '../personUpdate/personUpdate';


const App = () => {
    const history = useHistory();

    const [updatedPersonId, setupdatedPersonId] = useState(null);



    const updateUser = (id) => {
        history.push('/update');
        setupdatedPersonId(id);
    }

    const createElement =
        <CreateUser />
    const userList =
        <ListUsers updateUser={updateUser} />

    return (
        <div>

            <Route path="/" render={() => {
                return (
                    <React.Fragment>

                        {createElement}
                        {userList}
                    </React.Fragment>
                );
            }} exact />


            <Route path="/update" render={() => <UpdateUser updatedPersonId={updatedPersonId} />
            } exact />


        </div>
    );
}

export default App;


