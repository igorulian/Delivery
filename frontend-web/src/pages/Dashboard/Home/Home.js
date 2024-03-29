import React , {Component} from 'react';
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './Home.css'
import api from '../../../services/api'
import ReactLoading from 'react-loading';
//<ReactLoading type={'spin'} color={'#e3552f'} height={1000} width={100} />
import * as MdIcons from 'react-icons/md'
import {IconContext} from 'react-icons'
import Grafico from './components/Grafico'
import Avaliacoes from './components/Avaliacoes'

export default class Dashboard extends Component {

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
            // console.log(data)
            

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

    containerInfo = (valor,texto,icone) =>
    (
        <div className="container-home-infos">
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{marginTop: '14px'}}>
                    <IconContext.Provider value={{color: '#e3552f ', size: 80}}>
                        {icone}
                    </IconContext.Provider>
                </div>
                <div>
                    <h3> {valor} </h3>
                    <p> {texto} </p>
                </div>

            </div>
        </div>
    )


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
                {this.containerInfo(this.state.data.vendaMes,'Vendas efetuadas esse mês',<MdIcons.MdAttachMoney/> )}
                {this.containerInfo(this.state.data.vendaCanceladaMes,'Vendas Canceladas esse mês',<MdIcons.MdBlock/>)}
                {this.containerInfo(this.state.data.avaliacoesMes,'Novas avaliações esse mês',<MdIcons.MdAttachFile/>)}
                {this.containerInfo(4.5,'Pontuação média do restaurante',<MdIcons.MdStar/>)}
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
            
            <div className="conteudo-home-infos-graficos" style={{marginBottom: '10px', marginTop: '10px'}}>

                <Grafico grafico="dia" dados={{}}/>

                <Grafico grafico="mes" dados={{}}/>

                <Avaliacoes/>

            </div>
        </div>
      );

    }
    
}

{/* <div>Ícones feitos por <a href="https://www.flaticon.com/br/autores/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com</a></div> */}

