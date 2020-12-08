// PaoDeForma
import React, {Component} from 'react';
import api from '../../../../services/api'
import './ListaDeRestaurantes.css'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';
import Sidebar from '../Sidebar'
import * as GoContext from 'react-icons/go'
import {IconContext} from 'react-icons'

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

        const teste = await api.get(`/adm/store/list/all`,{
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
                <div className="container-restaurantes-para-checkar">
                    {this.state.requests.map(requests => (
                        <>
                        <div className="div-que-divide-no-meio">
                            <>
                            <div className="conteudo-restaurantes-para-checkar">
                                <h3> {requests.name} </h3>  
                                <p><b>Email: </b> {requests.email}</p>
                                <p><b>CNPJ: </b> {requests.cnpj}</p>
                                <p><b>Rua: </b> {requests.address.rua} {requests.address.numero}</p>
                                <p><b>Bairro: </b> {requests.address.bairro}</p>
                                <p><b>Craido: </b> {requests.createdAt}</p>
                            </div>
                            </>
                            {/* <div className="conteudo-botoes">
                                <button onClick={() => this.validarRestaurante(requests._id)} className="verificar"> <GoContext.GoCheck color={'white'} size={40}/> </button> 
                                <button onClick={() => this.excluirRestaurante(requests._id)} className="excluir"> <GoContext.GoX color={'white'} size={40}/></button>
                            </div> */}
                            
                        </div>
                        
                        <div className="linha-horizontal"></div>
                        </>
                    ))}
                </div>
            </div>
        )
    }


}