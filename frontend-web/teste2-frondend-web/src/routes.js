import React from 'react'
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import {Redirect} from 'react-router'

import {validarToken} from './services/validToken'

import Dashboard from './pages/Dashboard'
import Authenticate from './pages/Authenticate'
import PageNotFound from './pages/PageNotFound'
import Main from './pages/Main'
import Pedidos from './pages/Dashboard/Pedidos/Pedidos'
import PedidosFinalizados from './pages/Dashboard/Pedidos Finalizados/PedidosFinalizados'
import VizualizarPedidosFinalizados from './pages/Dashboard/Pedidos Finalizados/Vizualizar Pedidos Finalizados'
import Cardapio from './pages/Dashboard/Cardapio/Cardapio'
import AddProduto from './pages/Dashboard/Cardapio/Adicionar Produto'
import AddCategoria from './pages/Dashboard/Cardapio/Adicionar Categoria'
import Configuracao from './pages/Dashboard/Configuracao'
import { Login } from './pages/Authenticate/components'


const validToken = () => {
    if(localStorage.getItem('token')){
        return true
    }else{
        return false
    }
}

const PrivateRoute = props => {
    const vT = validToken()
    return vT ? <Route {...props} /> : window.location.href = '/login'
}

export default function MainRoutes(){
    return (
        <Routes>
            <PrivateRoute path="/dashboard" element={<Dashboard/>} />
            <PrivateRoute path="/dashboard/pedidos" element={<Pedidos/>} />
            <PrivateRoute path="/dashboard/pedidos-finalizados" element={<PedidosFinalizados/>} />
            <PrivateRoute path="/dashboard/pedidos-finalizados/vizualizar-pedidos" element={<VizualizarPedidosFinalizados/>} />
            <PrivateRoute path="/dashboard/cardapio" element={<Cardapio/>} />
            <PrivateRoute path="/dashboard/configuracao" element={<Configuracao/>} />
            <PrivateRoute path="/dashboard/adicionar-produto/:catid" element={<AddProduto/>} />
            <PrivateRoute path="/dashboard/adicionar-categoria" element={<AddCategoria/>} /> 
            <Route path="/login" element={<Authenticate/>} />
            <Route path="/" element={<Main/>} />
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    )
}