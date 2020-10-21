import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import api from '../../../services/api'
import ReactLoading from 'react-loading';
import './styles.css'

export default class Pedidos extends Component{

    state = {
        requestsCount: 0,
        requests: []
    }

    constructor(){
        super()
        this.state = { isLoading: true }
    }

    async componentDidMount(){
        await this.loadRequests()
        this.setState({isLoading: false})
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

    somarRequests = () =>{
        this.setState({requestsCount: this.state.requestsCount + 1})
    }

    atualizarProgresso = () => {

    }

    rejeitarPedido = () =>{

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

                        return(
                        <div className="container-pedido">

                            <div className="container-conteudo-header">
                                <h3> Pedido #0{t}</h3>
                                <p> {request.clientName} </p>
                            </div>

                            <div className="container-conteudo-pedido">
                                <div className="conteudo-pedido-produtos">
                                    {/* <p> {request.clientName} {this.state.requestsCount} </p>  */}
                                    <div>
                                        {request.products.map(product => (
                                            <p> 1x {product.name}</p>
                                        ))}  
                                    </div>
                                </div>
                                <div className="conteudo-pedido-endereco">
                                    {/* <p> {request.clientName} {this.state.requestsCount} </p>  */}
                                    <div>
    
                                        <>
                                        <p> Rua {request.location.rua}</p>
                                        <p> Nº: {request.location.numero}</p>
                                        <p> {request.location.bairro}</p>
                                        </>
                                        
                                    </div>
                                </div>
                            </div>

                            <div className="conteudo-pedido-preco">
                                <p>Total: R${request.cost}</p>
                            </div>

                            <div className="conteudo-pedido-botoes">
                                <button className="em-preparo" onClick={this.atualizarProgresso()}> Em preparo</button>
                                <button className="cancelar" onClick={this.rejeitarPedido()}> X </button>
                            </div>

                        </div>
                        )

                    }
                    )}
                </div>
            </div>
        )
    }
}