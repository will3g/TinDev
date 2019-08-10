import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import './Main.css';
import api from '../services/api';
import Logo from '../img/assets/logo.svg';
import Like from '../img/assets/like.svg';
import Dislike from '../img/assets/dislike.svg';
import itsaMatch from '../img/match/itsamatch.png';

export default function Main({ match }) {

    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);

    useEffect(() => { //Fazendo chamada a API
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: match.params.id,
                }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [match.params.id]);

    useEffect(() => { //Fazendo chamada ao WebSocket [ Tá no backend > main ]
        const socket = io('http://192.168.1.41:3333', {
            query: { user: match.params.id }
        })

        socket.on('match', dev => {
            setMatchDev(dev);
        })

        // //Função em tempo real, SEM FAZER REQUISIÇÕES no SERVIDOR, utilizando protocolo de WEBSOCKET
        // socket.on('world', message => { //Aqui temos o backend enviando informações para o frontend em tempo real
        //     console.log(message);
        // })

        // //Função em tempo real, SEM FAZER REQUISIÇÕES no SERVIDOR, utilizando protocolo de WEBSOCKET
        // setTimeout(() => {
        //     socket.emit('hello', { //Aqui temos o frontend enviando informações para o backend em tempo real
        //         message: 'hello world!'
        //     })
        // }, 3000);

    }, [match.params.id]);

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id !== id));
    }

    return ( 
        <div className = 'main-container' >
        <Link>
            <img src = { Logo } alt = 'Tindev'/>
        </Link> 
        {users.length > 0 ? ( 
            <ul> 
            {users.map(user => ( 
                <li key = { user._id }>
                    <img src = { user.avatar }
                        alt = { user.name }/> 
                    <footer>
                        <strong> { user.name } </strong> 
                        <p> { user.bio } </p> 
                    </footer>

                    <div className = 'buttons' >
                        <button type = 'button'
                            onClick = {() => handleDislike(user._id) }>
                        <img src = { Dislike } alt = 'Dislike'/>
                        </button> 
                        <button type = 'button' onClick = {() => handleLike(user._id) }>
                            <img src = { Like } alt = 'Like'/>
                        </button> 
                    </div> 
                </li>
                ))
            } 
            </ul>
            ) : ( <div className = 'empty'> Acabou por enquanto... </div> )
        } 
        
        { matchDev && (
            <div className="match-container">
                <img src={itsaMatch} alt="Deu match!"/>

                <img className="avatar" src={matchDev.avatar} alt=""/>
                <strong>{matchDev.name}</strong>
                <p>{matchDev.bio}</p>

                <button type="button" onClick={() => setMatchDev(null)}>Fechar</button>
            </div>
        ) }

        </div>
    );
}