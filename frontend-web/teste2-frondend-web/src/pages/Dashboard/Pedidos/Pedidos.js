import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import api from '../../../services/api'
import ReactLoading from 'react-loading';
import './styles.css'
import openSocket from 'socket.io-client'; 
import * as AiContext from 'react-icons/ai'
import {IconContext} from 'react-icons'

export default class Pedidos extends Component{

    state = {
        requests: []
    }

    constructor(){
        super()
        this.state = { isLoading: true }
    }

    async componentDidMount(){
        await this.loadRequests()
        this.setState({isLoading: false})
        this.conectarEOuvirSocker()
    }

    conectarEOuvirSocker = async () =>{
        const id = localStorage.getItem('id')
        const socket = openSocket('http://localhost:3001')
        socket.on(`${id}`, async data => {
            console.log(data)
            await this.loadRequests()
            alert("NOVO PEDIDO!")
        })
    }


    loadRequests = async () =>{
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            const response = await api.get(`/store/requests/list/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })
            this.setState({requests: response.data})
            console.log(response.data)
        }catch{
            console.log("Erro ao carregar produtos")
            alert("Erro ao carregar produtos")
        }
    }

    atualizarProgresso = async(request) => {
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            if(request.progress >= 2){
                // /store/finishedrequests/add/5f88f7a7fc2ae628408762b8/

                await api.post(`/store/finishedrequests/add/${id}`,request,{
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                })

                this.loadRequests()

                alert("Pedido finalizado!")
                return
            }
            
            const newRequest = request
            newRequest.progress = newRequest.progress + 1
            
            await api.post(`/store/requests/update/${id}/${request._id}`,newRequest,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            // enviar socket para usuario

            this.loadRequests()

        }catch{
            alert("Erro ao atualizar progresso do pedido!")
            console.log("Erro ao atualizar progresso do pedido!")
        }

    }

    // usuario
    efetuarPedido = async () =>{
        try{
            const socket = await openSocket('http://localhost:3001')

            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const newRequest = {
                clientName: "Igao nóia",
                clientID: "",
                products: [
                    
                    {
                        name: "X Tudo",
                        cost: 23
                    },
                    {
                        name: "X Salda",
                        cost: 23
                    },
                    {
                        name: "X Misto",
                        cost: 23
                    },
                    {
                        name: "Misto",
                        cost: 23
                    }
                    
                ],
                
                location: {
                    rua: "Albino ",
                    numero: 32,
                    cep: "14955000",
                    bairro: "Centro"
                },
                obs: "Tirar o picles do X Salada",
                
                progress: 0,
                cost: 23
            }

            const response = await api.post(`/store/requests/add/${id}`,newRequest,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            const request = {
                storeid: id,
                request: true
            }

            socket.emit('request', request)
    }catch{
        alert("Erro ao efetuar o pedido!")
    }
    }

    rejeitarPedido = async(reqid) =>{
        if(!window.confirm("Deseja rejeitar o pedido?")) return
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            await api.delete(`/store/requests/remove/${id}/${reqid}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })
            this.loadRequests()
        }catch{
            alert("Erro ao remover o pedido")
            console.log("Erro ao remover o pedido")
        }

    }


    render(){

        let t = 0
        
        if(this.state.isLoading){
            return (
                <div className='page'>
                <NavBar/>
                    <div className="conteudo">
                        <div className="loading">
                            <ReactLoading type={'spin'} color={'#e3552f'} height={1000} width={100} />
                        </div>
                    </div>
                </div>
            )
        }
        
        return (
            <div className='page'>
                <NavBar/>
                <div className='conteudo-pedidos'>
                    {this.state.requests.map(request =>{
                        t++
                        if(request.progress === 0){

                        }
                        return(
                        <>
                        <div key={request._id} className="container-pedido">

                            <div className="container-conteudo-header">
                                <h3> Pedido #0{t}</h3>
                                <p> {request.clientName} </p>
                            </div>

                            <div className="container-conteudo-pedido">
                                <div className="conteudo-pedido-produtos">
                                    {/* <p> {request.clientName} {this.state.requestsCount} </p>  */}
                                    <div>
                                        {request.products.map(product => (
                                            <p key={product._id}> 1x {product.name}</p>
                                        ))}  
                                    </div>
                                </div>
                                <div className="conteudo-pedido-endereco">
                                    {/* <p> {request.clientName} {this.state.requestsCount} </p>  */}
                                    <div>
    
                                        <>
                                        <p> Rua {request.location.rua}</p>
                                        <p> Nº {request.location.numero}</p>
                                        <p> {request.location.bairro}</p>
                                        </>
                                        
                                    </div>
                                </div>
                            </div>

                            {request.obs != null &&
                            <div className="conteudo-pedido-obs">
                                <p> <b>OBS:</b> {request.obs} </p>
                            </div>
                            }

                            <div className="conteudo-pedido-preco">
                                <p>Total: R${request.cost}</p>
                            </div>

                            <div className="conteudo-pedido-botoes">
                                {request.progress === 0 &&
                                <>
                                    <button className="em-preparo" onClick={ () => {this.atualizarProgresso(request)}}> Em preparo</button>
                                    <button className="cancelar" onClick={() => {this.rejeitarPedido(request._id)}}> <div> <AiContext.AiOutlineClose/>  </div> </button> 
                                </>
                                }

                                {request.progress === 1 &&
                                    <button className="saiu-para-entrega" onClick={ () => {this.atualizarProgresso(request)}}> Saiu para entrega </button> 
                                }

                                {request.progress >= 2 &&
                                    <button className="entregue" onClick={() => {this.atualizarProgresso(request)}}> Entregue! </button> 
                                }

                                
                            </div>

                        </div>
                        </>
                        )

                    }
                    )}
                </div>
            </div>
        )
    }
}