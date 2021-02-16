// PaoDeForma
import React, {Component} from 'react';
import api from '../../../services/api'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';
import Sidebar from './Sidebar'
import * as GoContext from 'react-icons/go'
import {IconContext} from 'react-icons'

export default class PaoDeFormaDashboard extends Component{

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

        const teste = await api.get(`/adm/store/list/tovalidate`,{
            headers: {
            'Authorization': `Bearer ${token}` 
            }
        })
        .then(res => {this.setState({requests: res.data})})
        .catch(err => {this.tokenInvalido()})
    }

    validarRestaurante = async (storeid) => {
        if(!window.confirm('Deseja validar esse restaurante?')) return
        if(!window.confirm('Certeza?')) return

        const token = localStorage.getItem('admtoken')

        const req =  {
            storeid
        }
        await api.post(`/adm/store/validate`,req,{
            headers: {
            'Authorization': `Bearer ${token}` 
            }
        })
        .then(res => {alert('Restaurante Validado com sucesso!')})
        .catch(err => {alert('Erro ao validar restaurante')})
        this.loadRequests()
    }
    excluirRestaurante = async (storeid) => {
        if(!window.confirm('Deseja excluir esse restaurante?')) return
        if(!window.confirm('Você tem certeza que deseja excluir esse restaurante?')) return
        if(!window.confirm('Certeza MEESMO????')) return
        if(!window.confirm('Beleza então, clica no OK ae, mas dps não fala que eu não avisei')) return

        const token = localStorage.getItem('admtoken')

        const req =  {
            storeid
        }
        await api.post(`/adm/store/delete`, req,{
            headers: {
            'Authorization': `Bearer ${token}` 
            }
        })
        .then(res => {alert('Restaurante Deletado com sucesso!')})
        .catch(err => {alert('Erro ao deletar restaurante')
        console.log(err)})
        this.loadRequests()
    }

    render(){
        return(   
            <div className="conteudo-paodeforma-dashboard">
                <Sidebar/>
                <h3> Validar Restaurante</h3>
                <div className="container-restaurantes-para-checkar">
                    {this.state.requests.map(requests => (
                        <>
                        <div className="div-que-divide-no-meio">
                            <>
                            <div className="conteudo-restaurantes-para-checkar">
                                <p><b>Nome: </b> {requests.name}</p>
                                <p><b>Email: </b> {requests.email}</p>
                                <p><b>CNPJ: </b> {requests.cnpj}</p>
                                <p><b>Rua: </b> {requests.address.rua} {requests.address.numero}</p>
                                <p><b>Bairro: </b> {requests.address.bairro}</p>
                                <p><b>Criado: </b> {requests.createdAt}</p>
                                <p><b>Telefone: </b> {requests.phoneNumber}</p>
                            </div>
                            </>
                            <div className="conteudo-botoes">
                                <button onClick={() => this.validarRestaurante(requests._id)} className="verificar"> <GoContext.GoCheck color={'white'} size={40}/> </button> 
                                <button onClick={() => this.excluirRestaurante(requests._id)} className="excluir"> <GoContext.GoX color={'white'} size={40}/></button>
                            </div>

                        </div>

                        {this.state.requests.length > 1 ? 
                        <div className="linha-horizontal"></div> 
                        : <></>
                        }
                        </>
                    ))}
                </div>
            </div>
        )
    }


}