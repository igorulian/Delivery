import React , {Component} from 'react';
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './Home.css'
import api from '../../../services/api'
import ReactLoading from 'react-loading';
import TimeField from 'react-simple-timefield';
import padeiro from '../../../img/padeiro.svg'
//<ReactLoading type={'spin'} color={'#e3552f'} height={1000} width={100} />

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
            console.log(this.state.info)
            localStorage.setItem('isOpen', response.data.isOpen)
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

            await api.post(`/store/update/${id}`,request,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            if(!window.confirm(`Deseja alterar o horario de fechamento automatico do restaurante?`)) return
            this.loadInfo()


        }catch{
            alert('Erro ao abrir/fechar restaurante')
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
                    <h3> 10000 </h3>
                    <p> Vendas esse mês</p>
                    {/* Colocar um icone daora */}
                </div>
                <div className="container-home-infos">
                    <h3> 20 </h3>
                    <p> Vendas Canceladas</p>
                </div>
                <div className="container-home-infos">
                    <h3> 3000 </h3>
                    <p> Não sei oq é</p>
                </div>
                <div className="container-home-infos">
                    <h3> 30 </h3>
                    <p> Ñ tenho a minima ideia</p>
                </div>
            </div>
            
            <div className='conteudo-home'>
                <div className="container-home-abrir">
                    <p> teste </p>
                </div>
                <div className="container-home-abrir">
                    {this.state.info.isOpen === true && 
                    <>
                    <h3> Fechar Restaurante </h3>
                    <p> Ao clicar no botão abaixo o seu restaurante aparecerá na lista de restaurantes abertos (até abri-lo denovo)</p>
                    <button className="fechar" onClick={() => this.abrirFecharRestaurante()}> FECHAR </button>
                    </>
                    }
                    {this.state.info.isOpen === false && 
                    <>
                    <h3> Abrir Restaurante </h3>
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

