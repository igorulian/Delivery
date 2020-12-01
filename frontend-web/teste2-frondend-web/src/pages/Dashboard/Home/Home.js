import React from 'react';
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './Home.css'

function Dashboard() {

      return (
        <>
          <NavBar/>
            <div className='conteudo-home'>
                <div className="container-home-abrir">
                    <h3> Teste </h3>
                    <p> Abrir / Fechar</p>
                    <button> ABRIR </button>
                </div>
            </div>
            
            <div className='conteudo-home'>
                <div className="container-home-abrir">
                    <h3> Teste </h3>
                    <p> Abrir / Fechar</p>
                    <button> ABRIR </button>
                </div>
            </div>
        </>
      );
    
}

export default Dashboard;
