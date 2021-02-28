import React,{Component}from 'react'
import NavBar from '../../components/NavBar'
import api from '../../../../services/api'
import {IconContext} from 'react-icons'
import * as AiIcons from 'react-icons/ai'
import './styles.css'
import { Link } from 'react-router-dom'

export default class VizualizarPedidosFinalizados extends Component {


    state = {
        finishedRequests: [],
        mesDaPagina: 0,
        mesDaPaginaNome: ''
    }

    componentDidMount(){
        this.loadFinishedRequests()
        const mes = window.location.href.replace('http://localhost:3000/dashboard/pedidos-finalizados/vizualizar-pedidos?mes=', '')
        switch (mes){
            case '1':
                this.setState({mesDaPaginaNome:'Janeiro'})
                break
            case '2':
                this.setState({mesDaPaginaNome:'Fevereiro'})
                break
            case '3':
                this.setState({mesDaPaginaNome:'Março'})
                break
            case '4':
                this.setState({mesDaPaginaNome:'Abril'})
                break
            case '5':
                this.setState({mesDaPaginaNome:'Maio'})
                break
            case '6':
                this.setState({mesDaPaginaNome:'Junho'})
                break
            case '7':
                this.setState({mesDaPaginaNome:'Julho'})
                break
            case '8':
                this.setState({mesDaPaginaNome:'Agosto'})
                break
            case '9':
                this.setState({mesDaPaginaNome:'Setembro'})
                break
            case '10':
                this.setState({mesDaPaginaNome:'Outubro'})
                break
            case '11':
                this.setState({mesDaPaginaNome:'Novembro'})
                break
            case '12':
                this.setState({mesDaPaginaNome:'Dezembro'})
                break
            default:
                this.setState({mesDaPaginaNome:'Erro'})
                break

        }
        this.setState({mesDaPagina: mes})
    }

    loadFinishedRequests = async () =>{
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            const mes = window.location.href.replace('http://localhost:3000/dashboard/pedidos-finalizados/vizualizar-pedidos?mes=', '')

            const response = await api.get(`/store/finishedrequests/list/${id}/${mes}`,{
                headers: {
                'Authorization': `Bearer ${token}`
                }
            })
            this.setState({finishedRequests: response.data})
            // console.log(response.data)
        }catch{
            console.log("Erro ao carregar produtos")
            alert("Erro ao carregar produtos")
        }
    }

    seguirParaDashborad = () => {
        window.location.href = '/dashboard/pedidos-finalizados'
    }

    tratarData = (data) => {
        let d = '' + String(data).split('T')[0]

        let dia = d.split('-')[2]
        let mes = d.split('-')[1]
        let ano = d.split('-')[0]

        d = dia + '/' + mes + '/' + ano
        
        return d
    }
    
    tratarHora = (data) => {
        const h = String(data).split('T')[1]
        return h
    }

    render() {
        let t = 0
        let total = 0

        return (
            <>
            <div className='page'>
                <NavBar/>
                <div className="header">
                    <Link to={'/dashboard/pedidos-finalizados'}>
                        <button>
                            <IconContext.Provider value={{color: '#e3552f ', size: 30}} >
                                <AiIcons.AiOutlineArrowLeft/>
                            </IconContext.Provider>
                        </button>
                    </Link>
                    <h1> Pedidos de {this.state.mesDaPaginaNome}</h1>
                </div>
                <div className='conteudo-pedidos'>
                    {this.state.finishedRequests.map(request =>{

                        const mes = String(this.tratarData(request.createdAt)).split('/')[1]
                        if(!(mes || mes === this.state.mesDaPagina)) return
                        
                        t++
                        {total = total + request.cost}
                        return(
                        <>
                        <div key={request._id} className="container-pedido" style={{width: '10%', height: '10%'}}>

                            <div className="container-conteudo-header">
                                <h3> Pedido #0{t}</h3>
                                <p> {request.clientName} </p>
                            </div>

                            <div className="container-conteudo-pedido">
                                <div className="conteudo-pedido-produtos">
                                    {/* <p> {request.clientName} {this.state.requestsCount} </p>  */}
                                    <div>
                                        {request.products.map(product => (
                                            <p key={product._id}> - {product.name}</p>
                                        ))}  
                                    </div>
                                </div>
                                <div className="conteudo-pedido-endereco">
                                    <div>
    
                                        <>
                                        <p> Rua {request.location.rua}</p>
                                        <p> Nº {request.location.numero}</p>
                                        <p> {request.location.bairro}</p>
                                        </>
                                        
                                    </div>
                                </div>
                            </div>

                            {/* {request.obs != null &&
                            <div className="conteudo-pedido-obs">
                                <p> <b>OBS:</b> {request.obs} </p>
                            </div>
                            } */}
                            
                            {request.paymentMethod != null && 
                            <div className="conteudo-pedido-obs">
                                <p> <b>Pagamento: </b> {request.paymentMethod === 0 ? 'Cartão 💳' : request.paymentMethod > 0 ? "Dinheiro 💵" : "Picpay 💵"}</p>
                                {request.paymentMethod > 0 && 
                                <p> <b>Troco: </b> {"R$" + request.paymentMethod}</p>
                                }
                                {request.obs != null &&
                                
                                <p> <b>OBS:</b> {request.obs} </p>
                                }
                            </div>
                            }

                            <div className="conteudo-pedido-obs">
                                <p> <b>Data:</b> {this.tratarData(request.createdAt)} </p>
                                {/* <p> <b>Hora:</b> {this.tratarHora(request.createdAt)} </p> */}
                            </div>

                            <div className="conteudo-pedido-preco">
                                <p>Total: R${request.cost}</p>
                            </div>

                        </div>
                        </>
                        )

                    }
                    )}
                </div> 
                <div className="bottom-resumo-dos-pedidos">
                    <h1>Total: R${total}</h1>
                    <h3>5% de {total} = R${(total * 5 ) / 100}</h3>
                </div>
            </div>
            </>
        )
    }

}