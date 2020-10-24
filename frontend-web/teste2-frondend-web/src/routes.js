import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

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

export default function MainRoutes(){
    return(
        <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/pedidos" element={<Pedidos/>} />
            <Route path="/dashboard/pedidos-finalizados" element={<PedidosFinalizados/>} />
            <Route path="/dashboard/pedidos-finalizados/vizualizar-pedidos" element={<VizualizarPedidosFinalizados/>} />
            <Route path="/dashboard/cardapio" element={<Cardapio/>} />
            <Route path="/dashboard/adicionar-produto/:catid" element={<AddProduto/>} />
            <Route path="/dashboard/adicionar-categoria" element={<AddCategoria/>} /> 
            <Route path="/login" element={<Authenticate/>} />
            <Route path="/" element={<Main/>} />
            <Route path="*" element={<PageNotFound/>} />
        </Routes>
    )
}