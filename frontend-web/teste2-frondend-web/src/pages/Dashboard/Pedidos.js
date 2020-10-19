import React from 'react'
import './page-style.css'
import NavBar from './components/NavBar'


const Pedidos = () => {
    return (
        <div className='page'>
            <NavBar/>
            <div className='conteudo'>
                <h1> Pedidos</h1>
            </div>
        </div>
    )
}

export default Pedidos