import React, {Component} from 'react';
import api from '../../../services/api'
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './cfg-styles.css'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';

export default class Configuracao extends Component{

    state = {
        dados: {
            nome: '',
            rua: '',
            numero: '',
            bairro: '',
        },
        isLoading: true,
    }

    constructor(){
        super()
        this.setState({isLoading: true})
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

            const nome = response.data.name
            const {rua, numero, bairro} = response.data.address

            this.setState({dados:{
                nome,
                rua,
                numero,
                bairro
            }})
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
        }

        return (
            <>
            <NavBar/>
                <div className='conteudo'>
                <div className='container-config' style={{marginBottom: '100px'}}>
                    <h2> Configurações </h2>

                    <div className="imgInput" style={{margin: '0 auto', marginTop: '20px'}}> Envie sua imagem </div>

                    <div className="form" style={{flexDirection: 'row'}}>

                    <div className="form-group" style={{padding: '15px'}}>
                            <label htmlFor="name">Nome do Restaurante</label>
                            <input style={{minWidth: '16em'}} type="name" name="name" placeholder="Digite o nome do restaurante" defaultValue={this.state.dados.nome}/>

                            <label htmlFor="email">Algm Coisa</label>
                            <input style={{minWidth: '16em'}} type="email" name="email" placeholder="Digite o sla do restaurante"/>

                            <label htmlFor="telefone">Telefone</label>
                            <input style={{minWidth: '16em'}}  type="telefone" name="telefone" placeholder="Digite o telefone do restaurante" defaultValue={this.state.dados.email}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="rua">Rua</label>
                            <input style={{minWidth: '16em'}} type="rua" name="rua" placeholder="Digite a rua do restaurante" defaultValue={this.state.dados.rua}/>

                            <label htmlFor="numero">Numero</label>
                            <input style={{minWidth: '16em'}} type="numero" name="numero" placeholder="Digite o numero do restaurante" defaultValue={this.state.dados.numero} />

                            <label htmlFor="bairro">Bairro</label>
                            <input style={{minWidth: '16em'}} type="bairro" name="bairro" placeholder="Digite o bairro do restaurante" defaultValue={this.state.dados.bairro}/>
                        </div>
                    </div>
                    <button className='btnSalvar'> Salvar </button>
                </div>
                </div>
            </>
        );
    }
    
}
