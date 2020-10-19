import React from 'react';
import {Router, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import NavBar from './components/NavBar'
import Switch from 'react-bootstrap/esm/Switch';
import './style.css'
import './page-style.css'
import validToken from '../../services/validToken'

function Dashboard() {
    const navigate = useNavigate()
    // console.log("token: " + localStorage.getItem('token'))
    // console.log("id: " + localStorage.getItem("id"))

    validToken()


      return (
        <>
          <NavBar/>
            <div className='conteudo'>
              <h1> Home </h1>
            </div>
        </>
      );
    
}

export default Dashboard;
