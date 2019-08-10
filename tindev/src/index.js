import React from 'react';

// Com esse comando ignoramos avisos do WebSocket no celular
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
]);
    
import Routes from './routes';

export default function App() {
    return ( 
        <Routes/>
        );
}

