import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


import { Title } from './title';
import { SelectBreed, SelectSubBreed, SearchDog } from './components/filters';
import { TableData }  from './components/table';


ReactDOM.createRoot( document.getElementById('root') ).render(
    <React.StrictMode>
        <Title />
        <div className="row">
            <SearchDog />
            <SelectBreed />
            <SelectSubBreed />
        </div>
        <TableData />
    </React.StrictMode>
)