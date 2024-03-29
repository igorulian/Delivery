import React , {Component} from 'react';
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './Home.css'
import api from '../../../services/api'
import ReactLoading from 'react-loading';
import TimeField from 'react-simple-timefield';
import padeiro from '../../../img/padeiro.svg' // MdAttachMoney    MdBlock
//<ReactLoading type={'spin'} color={'#e3552f'} height={1000} width={100} />
import * as MdIcons from 'react-icons/md'
import {IconContext} from 'react-icons'

export default class Dashboard extends Component {

    constructor() {
        super()
    }

    onTimeChange = (event,value) =>{

        this.setState({autoClose: value})

    }

    state = {
        info: {
            isOpen: false
        },
        isLoading: true,
    }

    loadInfo = async () => {
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            const response = await api.get(`/store/show/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })
            this.setState({info: response.data})
            localStorage.setItem('isOpen', response.data.isOpen)

            const data = await api.get(`store/info/home/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            this.setState({data: data.data})
        }catch{
            alert('Erro ao carregar Informações')
        }
    }

    async componentDidMount(){
        await this.loadInfo()
        this.setState({isLoading: false})
    }

    abrirFecharRestaurante = async() => {
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const isOpenInfo = this.state.info.isOpen

            const request = {
                isOpen: !isOpenInfo
            }

            await api.post(`/store/update/${id}`,request,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            if(!window.confirm(`Deseja ${isOpenInfo === true ? 'Fechar' : 'Abrir' } o restaurante?`)) return


        }catch{
            alert('Erro ao abrir/fechar restaurante')
        }

        this.loadInfo()

    }

    alterarHorarioFechamento = async (horario) => {
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const request = {
                autoClose: this.state.autoClose
            }

            if(!window.confirm(`Deseja alterar o horario de fechamento automatico do restaurante?`)) return

            await api.post(`/store/update/${id}`,request,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

           
            this.loadInfo()


        }catch{
            alert('Erro ao abrir/fechar restaurante')
        }
    }
// deliveryFee
    alterarTaxaDeEntrega = async (taxa) => {
        try{

            const newFee = this.taxaEntrega.value

            var er = /^[0-9]+$/;

            if(!er.test(newFee)){
                alert('Valor inválido')
                return
            }

            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const request = {
                deliveryFee: newFee
            }

            if(!window.confirm(`Deseja alterar a taxa de entrega do restaurante?`)) return

            await api.post(`/store/update/${id}`,request,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            
            this.loadInfo()

        }catch{
            alert('Erro ao alterar a taxa de entrega restaurante')
        }
    }


    render(){
        
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
            <div className='conteudo-home-infos'>
                <div className="container-home-infos">
                    <div style={{display: 'flex', height: '100%'}}>
                        <div style={{marginTop: '14px'}}>
                            <IconContext.Provider value={{color: '#e3552f ', size: 80}}>
                                <MdIcons.MdAttachMoney/>  
                            </IconContext.Provider>
                        </div>
                        <div>
                            <h3> {this.state.data.vendaMes} </h3>
                            <p> Vendas efetuadas esse mês</p>
                        </div>

                    </div>
                    {/* Colocar um icone daora */}
                </div>
                <div className="container-home-infos">
                    <div style={{display: 'flex', height: '100%'}}>
                        <div style={{marginTop: '18px'}}>
                            <IconContext.Provider value={{color: '#e3552f ', size: 70}}>
                                <MdIcons.MdBlock/>  
                            </IconContext.Provider>
                        </div>
                        <div>
                            <h3> {this.state.data.vendaCanceladaMes} </h3>
                            <p> Vendas Canceladas esse mês</p>
                        </div>

                    </div>

                </div>
                <div className="container-home-infos">
                    <div style={{display: 'flex', height: '100%'}}>
                        <div style={{marginTop: '18px'}}>
                            <IconContext.Provider value={{color: '#e3552f ', size: 70}}>
                                <MdIcons.MdAttachFile/>  
                            </IconContext.Provider>
                        </div>
                        <div>
                            <h3> {this.state.data.avaliacoesMes} </h3>
                            <p> Novas avaliações esse mês</p>
                        </div>

                    </div>
                </div>
                <div className="container-home-infos">
                <div style={{display: 'flex', height: '100%'}}>
                        <div style={{marginTop: '18px'}}>
                            <IconContext.Provider value={{color: '#e3552f ', size: 70}}>
                                <MdIcons.MdStar/>  
                            </IconContext.Provider>
                        </div>
                        <div>
                            <h3> 4.5 </h3>
                            <p> Pontuação média do restaurante</p>
                        </div>

                    </div>
                </div>
            </div>
            
            <div className='conteudo-home'>
                <div className="container-home-abrir">
                    <h3> Taxa de Entrega </h3>
                    <p> Setar taxa de entrega do restaurante</p>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h3 style={{marginRight: '5px'}}> R$ </h3>
                    <input
                        type={'number'}
                        ref={input => this.taxaEntrega = input}
                        defaultValue={this.state.info.deliveryFee}
                        max={'10'}
                        maxlength="2"
                        style={{
                        border: '2px solid #ddd',
                        fontSize: 30,
                        width: 80,
                        padding: '5px 7px',
                        color: '#333',
                        borderRadius: 3,
                        marginTop: 5,
                        paddingLeft: '15px',
                        backgroundColor: '#f9f9f9',
                        paddingRight: '2px',
                        }}
                    />
                    </div>
                    <button className="alterar" onClick={ () => this.alterarTaxaDeEntrega()}> alterar </button>
                </div>
                <div className="container-home-abrir">
                    {this.state.info.isOpen === true && 
                    <>
                    <h3> Restaurante Aberto  </h3>
                    <p> Ao clicar no botão abaixo o seu restaurante aparecerá na lista de restaurantes abertos (até abri-lo denovo)</p>
                    <button className="fechar" onClick={() => this.abrirFecharRestaurante()}> FECHAR </button>
                    </>
                    }
                    {this.state.info.isOpen === false && 
                    <>
                    <h3> Restaurante Fechado </h3>
                    <p> Ao clicar no botão abaixo o seu restaurante aparecerá na lista de restaurantes abertos e poderá receber pedidos a qualquer momento :)</p>
                    {/* <img src={padeiro} style={{width: '50px', height: '50px'}} /> */}
                    <button className="abrir" onClick={() => this.abrirFecharRestaurante()}> ABRIR </button>
                    </>
                    }
                </div>
                <div className="container-home-abrir">
                    <h3> Fechamento Automatico </h3>
                    <p> Setar horário automático para o fechamento do restaurante</p>
                    <TimeField
                        value={this.state.info.autoClose}
                        onChange={this.onTimeChange}
                        style={{
                        border: '2px solid #ddd',
                        fontSize: 30,
                        width: 107,
                        padding: '5px 7px',
                        color: '#333',
                        borderRadius: 3,
                        marginTop: 5,
                        paddingLeft: '15px',
                        backgroundColor: '#f9f9f9'
                        }}
                    />
                    <button className="alterar" onClick={ () => this.alterarHorarioFechamento()}> alterar </button>
                </div>
                <div className="container-home-abrir">
                    <h3> Tempo de entrega </h3>
                    <p> Setar o tempo média de preparo e entrega do produto</p>
                    <TimeField
                        value={this.state.info.autoClose}
                        onChange={this.onTimeChange}
                        style={{
                        border: '2px solid #ddd',
                        fontSize: 30,
                        width: 107,
                        padding: '5px 7px',
                        color: '#333',
                        borderRadius: 3,
                        marginTop: 5,
                        paddingLeft: '15px',
                        backgroundColor: '#f9f9f9'
                        }}
                    />
                    <button className="alterar" onClick={ () => this.alterarHorarioFechamento()}> alterar </button>
                </div>
            </div>

            <div className='conteudo-home-graficos'>
                <div className="container-home-grafico">
                    <h3> Grafico Foda </h3>
                </div>
                <div className="container-home-avaliacoes">
                    <h3> Avaliações </h3>
                </div>
            </div>
        </div>
      );

    }
    
}

{/* <div>Ícones feitos por <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com</a></div> */}

