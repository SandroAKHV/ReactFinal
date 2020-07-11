import React, {useState} from 'react';
import { Route, useHistory } from 'react-router-dom';

import axios from 'axios'

import CreateUser from '../addPerson/addUser';
import ListUsers from '../persons/person';

import UpdateUser from '../personUpdate/personUpdate';


const App = () => {
    const history = useHistory();

    const [updatedUserId, setUpdatedUserId] = useState(null);

 

    const updateUser = (id) => {
        history.push('/update');
        setUpdatedUserId(id);
    }

    const createElement = 
       <CreateUser /> 
    const userList =
       <ListUsers updateUser={updateUser}/> 

    return (
        <div>

            <Route path="/" render={() => {
                return (
                    <React.Fragment>        
                        
                        {createElement}
                        {userList}
                    </React.Fragment>
                );
            }} exact/>

         
            <Route path="/update" render={() => <UpdateUser updatedUserId={updatedUserId}/>
            } exact/>


        </div>
    );
}

export default App;


