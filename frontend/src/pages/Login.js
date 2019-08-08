import React, { useState } from 'react';
import api from '../services/api';
import logo from '../img/assets/logo.svg';
import './login.css';


export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/devs', {
            username,
        });

        const { _id } = response.data;

        history.push(`/dev/${_id}`);
    }

    return ( <
        div className = 'login-container' >
        <
        form onSubmit = { handleSubmit } >
        <
        img src = { logo }
        alt = "Tindev" / >
        <
        input placeholder = "Digite seu usuário do GitHub"
        value = { username }
        onChange = { e => setUsername(e.target.value) }
        />   <
        button type = 'submit' > Entrar < /button>   <
        /form >   <
        /div>
    );
}