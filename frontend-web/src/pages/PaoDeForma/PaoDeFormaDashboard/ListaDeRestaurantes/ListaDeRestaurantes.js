// PaoDeForma
import React, {Component} from 'react';
import api from '../../../../services/api'
import './ListaDeRestaurantes.css'
import {Link} from 'react-router-dom'
import Sidebar from '../Sidebar'
import * as GoContext from 'react-icons/go'

export default class ListaDeRestaurantes extends Component{

    state = { 
        requests: []
    }

    async componentDidMount(){
        console.log('tkn: ' + localStorage.getItem('admtoken'))
        // await this.checkarToken()
        await this.loadRequests()
    }

    checkarToken = async () => {
        const token = localStorage.getItem('admtoken')

        await api.get(`/adm/teste`,{
            headers: {
            'Authorization': `Bearer ${token}` 
            }
        })
        .then(res => {console.log('Token Verificado!')})
        .catch(err => {this.tokenInvalido()})
    }

    tokenInvalido = () => {
        // localStorage.setItem('admtoken', '')
        return <Link to={'/login'}/>
    }

    loadRequests = async () => {
        const token = localStorage.getItem('admtoken')

        await api.get(`/adm/store/list/all`,{
            headers: {
            'Authorization': `Bearer ${token}` 
            }
        })
        .then(res => {this.setState({requests: res.data})})
        .catch(err => {this.tokenInvalido()})
    }


    render(){
        return(   
            <div className="conteudo-paodeforma-dashboard">
                <Sidebar/>
                <h3> Lista de restaurantes</h3>
                <div classname="area" style={{width: '100%', height: '100%'}}>
                <div className="container-restaurantes-para-checkar">
                    {this.state.requests.map(requests => requests.isValid === true ? (
                        <>
                        
                        <div className="div-que-divide-no-meio">
                            <>
                            <div className="conteudo-restaurantes-para-checkar">
                                <p><b>Nome: </b> {requests.name}</p>
                                <p><b>Email: </b> {requests.email}</p>
                                <p><b>CNPJ: </b> {requests.cnpj}</p>
                                <p><b>Rua: </b> {requests.address.rua} {requests.address.numero}</p>
                                <p><b>Bairro: </b> {requests.address.bairro}</p>
                                <p><b>Craido: </b> {requests.createdAt}</p>
                                <p><b>Telefone: </b> {requests.phoneNumber}</p>
                            </div>
                            </>
                            <div className="conteudo-botoes">
                                <button style={{backgroundColor: '#3F3F3F'}} onClick={() => this.validarRestaurante(requests._id)} className="verificar"> <GoContext.GoCheck color={'white'} size={40}/> </button> 
                                <button style={{backgroundColor: '#333'}} onClick={() => this.excluirRestaurante(requests._id)} className="excluir"> <GoContext.GoX color={'white'} size={40}/></button>
                            </div>

                        </div>
                        
                        {this.state.requests.length > 1 ? 
                        <div className="linha-horizontal"></div> 
                        : <></>
                        }

                        </>
                    ) : <></>)}
                </div>
                </div>
            </div>
        )
    }


}