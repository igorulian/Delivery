import React from 'react';
import NavBar from './components/NavBar'
import './style.css'
import './page-style.css'

function Dashboard() {

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
