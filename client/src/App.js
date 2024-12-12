import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './components/UserForm';
import UserEdit from './components/UserEdit';
import UserList from './components/UserList';
import exampleVideo from './assets/videos/example2.mp4';
import Serpentin from './components/Serpentin';
import './theme.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const addUser = async (user) => {
        try {
            const response = await axios.post(`${backendUrl}/api/users`, user);
            setUsers([...users, response.data]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const updateUser = async (updatedUser) => {
        try {
            const response = await axios.put(`${backendUrl}/api/users/${updatedUser._id}`, updatedUser);
            setUsers(users.map(user => (user._id === updatedUser._id ? response.data : user)));
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${backendUrl}/api/users/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div id="app" className="app">
            <Serpentin />
            <video autoPlay loop muted className="background-video">
                <source src={exampleVideo} type="video/mp4" />
                Votre navigateur ne supporte pas la balise vidéo.
            </video>
            <div className="content">
                <UserForm addUser={addUser} />
                {selectedUser && (
                    <UserEdit
                        user={selectedUser}
                        onUpdate={updateUser}
                    />
                )}
                <UserList
                    users={users}
                    editUser={(id) => {
                        const user = users.find(user => user._id === id);
                        setSelectedUser(user);
                    }}
                    deleteUser={deleteUser}
                />
            </div>
        </div>
    );
};

export default App;
