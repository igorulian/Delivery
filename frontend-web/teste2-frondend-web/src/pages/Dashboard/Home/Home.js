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
import * as FaIcons from 'react-icons/fa'
import * as IoIcons from 'react-icons/io'
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
        taxaEntrega: 0,
        fechamentoAutomatico: '00:00',
        tempoEntrega: 0
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

    atualizarDados = async () => {
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const request = {
                
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
            
            <div className='conteudo-home-graficos'>
                <div className="container-home-grafico">
                    <div style={{width: '100%', textAlign: 'center', marginBottom: '40px'}}>
                        <h2> <IconContext.Provider value={{color: '#e3552f'}}> <FaIcons.FaTools/> Configurações <FaIcons.FaTools/> </IconContext.Provider> </h2> 
                    </div>

                    <div className="config-section">
                        <p className="config-title"> Taxa de entrega: </p>
                        <p className="config-cfg"> R$4.00 </p>
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
                    
                    <div className="line">&nbsp;</div>

                    <div className="config-section">
                        <p className="config-title"> Fechamento automatico: </p>
                        <p className="config-cfg"> 22:00h </p>
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

                    <div className="line">&nbsp;</div>

                    <div className="config-section">
                        <p className="config-title"> Tempo de entrega: </p>
                        <p className="config-cfg"> 00:40m </p>
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
                        <button> Atualizar </button>
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

