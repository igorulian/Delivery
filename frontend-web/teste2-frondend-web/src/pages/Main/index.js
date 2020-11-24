import React from 'react';
import {useNavigate} from 'react-router-dom'
import validToken from '../../services/validToken'

function Main() {
    const navigate = useNavigate()

    // console.log("token: " + localStorage.getItem('token'))
    // console.log("id: " + localStorage.getItem("id"))
    // validToken()

    
    return (
      <div>
      </div>
  );
}

export default Main;
