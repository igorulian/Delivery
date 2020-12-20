import React , {Component} from 'react';
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './Home.css'
import api from '../../../services/api'
import ReactLoading from 'react-loading';
//<ReactLoading type={'spin'} color={'#e3552f'} height={1000} width={100} />
import * as MdIcons from 'react-icons/md'
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
import {IconContext} from 'react-icons'

export default class Dashboard extends Component {

    constructor() {
        super()
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
            // console.log(response.data.isOpen)
            
            if(response.data.isOpen === true){
                localStorage.setItem('isOpen', true)
            }else{
                localStorage.setItem('isOpen', false)
            }


            const data = await api.get(`store/info/home/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            this.setState({data: data.data})
            console.log(data)
            

        }catch{
            localStorage.setItem('token', '')
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

            if(!window.confirm(`Deseja ${isOpenInfo === true ? 'Fechar' : 'Abrir' } o restaurante?`)) return

            await api.post(`/store/update/${id}`,request,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            if(isOpenInfo === true){
                localStorage.setItem('isOpen', false)
            }else{
                localStorage.setItem('isOpen', true)
            }



        }catch{
            alert('Erro ao abrir/fechar restaurante')
        }

        this.loadInfo()

    }

    alterarHorarioFechamento = async (maisoumenos) => {
        try{
            if( maisoumenos >= 1 && this.state.info.autoClose >= 23) return
            if( maisoumenos < 1 && this.state.info.autoClose <= 0) return

            this.setState({info: {
                autoClose: this.state.info.autoClose + maisoumenos,
                deliveryFee: this.state.info.deliveryFee,
                deliveryTime: this.state.info.deliveryTime,
                isOpen: this.state.info.isOpen
            }})

        }catch{
            alert('Erro ao abrir/fechar restaurante')
        }
    }
// deliveryFee
    alterarTaxaDeEntrega = async (maisoumenos) => {
        try{

            if(maisoumenos <= 0 && this.state.info.deliveryFee <= 0) return

            this.setState({info: {
                deliveryFee: this.state.info.deliveryFee + maisoumenos,
                autoClose: this.state.info.autoClose,
                deliveryTime: this.state.info.deliveryTime,
                isOpen: this.state.info.isOpen
            }})


        }catch{
            alert('Erro ao alterar a taxa de entrega restaurante')
        }
    }

    alterarTempoDeEntrega = async (maisoumenos) => {
        try{

        if(maisoumenos <= 0 && this.state.info.deliveryTime <= 1) return

        if(maisoumenos > 0 && this.state.info.deliveryTime >= 60) return

        this.setState({info: {
            deliveryFee: this.state.info.deliveryFee,
            autoClose: this.state.info.autoClose,
            deliveryTime: this.state.info.deliveryTime + maisoumenos,
            isOpen: this.state.info.isOpen
        }})

        }catch{
            alert('Erro ao alterar tempo de entrega ')
        }

    }

    atualizarDados = async () => {
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const request = {
                deliveryFee: this.state.info.deliveryFee,
                autoClose: this.state.info.autoClose
            }

            await api.post(`/store/update/${id}`,request,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            if(!window.confirm(`Deseja atulizar os dados do restaurante?`)) return


        }catch{
            alert('Erro ao ataulizar dados do restaurante')
        }

        this.loadInfo()
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
            <div className='conteudo-home-infos'>
                <div className="container-home-infos" style={{textAlign: 'center'}}>
                    <div>
                        <div style={{width: '100%', display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                            <h2 style={{marginRight: '8px'}}> Status: </h2>
                            <div> {this.state.info.isOpen ? <h2 style={{color: '#4cac43'}}>Aberto</h2> : <h2 style={{color: '#cf4a4a'}}>Fechado</h2>} </div>
                        </div>
                        
                        <p> Ao abrir o restaurante você poderá </p>
                        <p> receber pedidos de clientes</p>
                    </div>
                    <div className="div-btn-atualizar">
                        <button style={{fontSize: '30px'}}onClick={() => this.abrirFecharRestaurante()}> {this.state.info.isOpen ? 'Fechar' : 'Abrir'} </button>
                    </div>
                </div>
            </div>
            <div className='conteudo-home-graficos'>
                <div className="container-home-grafico">
                    <div style={{width: '100%', textAlign: 'center', marginBottom: '40px'}}>
                        <h2> <IconContext.Provider value={{color: '#e3552f'}}> <FaIcons.FaTools/> Configurações <FaIcons.FaTools/> </IconContext.Provider> </h2> 
                    </div>

                    <div className="config-section">
                        <p className="config-title"> Taxa de entrega: </p>
                        <p className="config-cfg"> R${this.state.info.deliveryFee}.00</p>
                        <div className="config-buttons">
                            <button onClick={() => this.alterarTaxaDeEntrega(1)}> 
                                <IconContext.Provider value={{color: '#e3552f ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropupCircle/> 
                                </IconContext.Provider> 
                            </button> 

                            <button onClick={() => this.alterarTaxaDeEntrega(-1)}> 
                                <IconContext.Provider value={{color: '#F0C910 ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropdownCircle/>  
                                </IconContext.Provider>
                            </button> 
                        </div>
                    </div>
                    
                    <div className="line">&nbsp;</div>

                    <div className="config-section">
                        <p className="config-title"> Fechamento automatico: </p>
                        <p className="config-cfg"> {this.state.info.autoClose}:00h </p>
                        <div className="config-buttons">
                            <button onClick={() => this.alterarHorarioFechamento(1)}> 
                                <IconContext.Provider value={{color: '#e3552f ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropupCircle/> 
                                </IconContext.Provider> 
                            </button> 

                            <button onClick={() => this.alterarHorarioFechamento(-1)}> 
                                <IconContext.Provider value={{color: '#F0C910 ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropdownCircle/>  
                                </IconContext.Provider>
                            </button> 
                        </div>
                    </div>

                    <div className="line">&nbsp;</div>

                    <div className="config-section">
                        <p className="config-title"> Tempo de entrega: </p>
                        <p className="config-cfg"> 00:{this.state.info.deliveryTime}m </p>
                        <div className="config-buttons">
                            <button onClick={() => this.alterarTempoDeEntrega(1)}> 
                                <IconContext.Provider value={{color: '#e3552f ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropupCircle/> 
                                </IconContext.Provider> 
                            </button> 

                            <button onClick={() => this.alterarTempoDeEntrega(-1)}> 
                                <IconContext.Provider value={{color: '#F0C910 ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropdownCircle/>  
                                </IconContext.Provider>
                            </button> 
                        </div>
                    </div>

                    <div className="line">&nbsp;</div>

                    <div className="config-section">
                        <p className="config-title"> Não tenho idéia: </p>
                        <p className="config-cfg"> 00.00 </p>
                        <div className="config-buttons">
                            <button> 
                                <IconContext.Provider value={{color: '#e3552f ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropupCircle/> 
                                </IconContext.Provider> 
                            </button> 

                            <button> 
                                <IconContext.Provider value={{color: '#F0C910 ', size: 30}}> 
                                    <IoIcons.IoMdArrowDropdownCircle/>  
                                </IconContext.Provider>
                            </button> 
                        </div>
                    </div>

                    <div className="div-btn-atualizar">
                        <button onClick={() => this.atualizarDados()}> Atualizar </button>
                    </div>
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

