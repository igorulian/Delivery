import React, {Component} from 'react';
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import ReactLoading from 'react-loading';
import ConfigPerfil from './components/ConfigPerfil'
import ConfigGeral from './components/ConfigGeral'
import api from '../../../services/api'
import ConfigPagamento from './components/ConfigPagamento';
import './index.css'

export default class Configuracao extends Component{

    state = {
        isLoading: true,
        isUploadingFile: false
    }

    async componentDidMount(){
        await this.carregarInformacoes()
        this.setState({isLoading: false})
    }

    carregarInformacoes = async () =>{
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const response = await api.get(`/store/show/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            this.setState({dados: response.data})


        }catch{
            alert('Erro ao carregar dados.')
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

        }else{

            return (
                <>
                <NavBar/>
                    <div className='conteudo'>
                        <div className="container-geral-config">
                            <ConfigPerfil dados={this.state.dados} reloadInfo={() => {alert('teste')}}/>
                            <ConfigGeral dados={this.state.dados}/>
                            <ConfigPagamento dados={this.state.dados}/>
                        </div>
                    </div>
                </>
            )

        }
    }
    
}
