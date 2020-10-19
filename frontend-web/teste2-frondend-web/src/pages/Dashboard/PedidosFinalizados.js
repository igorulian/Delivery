import React from 'react'
import './page-style.css'
import validToken from '../../services/validToken'

import NavBar from './components/NavBar'
const PedidosFinalizados = () => {

    return (
        <div className='page'>
            <NavBar/>
            <div className='conteudo'>
                <h1> Pedidos Finalizados</h1>
            </div>
        </div>
    )
}

export default PedidosFinalizados