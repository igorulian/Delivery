import React, {Component} from 'react'
import * as IoIcons from 'react-icons/io'
import {IconContext} from 'react-icons'
import api from '../../../../services/api'
import './ConfigGeral.css'

export default class ConfigGeral extends Component{

    state = {
        dados: this.props.dados
    }
    
    alterarHorarioFechamento = async (maisoumenos) => {
        try{
            if( maisoumenos >= 1 && this.state.dados.autoClose >= 23) return
            if( maisoumenos < 1 && this.state.dados.autoClose <= 0) return

            this.setState({dados: {
                autoClose: this.state.dados.autoClose + maisoumenos,
                deliveryFee: this.state.dados.deliveryFee,
                deliveryTime: this.state.dados.deliveryTime,
                isOpen: this.state.dados.isOpen
            }})

        }catch{
            alert('Erro ao abrir/fechar restaurante')
        }
    }
// deliveryFee
    alterarTaxaDeEntrega = async (maisoumenos) => {
        try{

            if(maisoumenos <= 0 && this.state.dados.deliveryFee <= 0) return

            this.setState({dados: {
                deliveryFee: this.state.dados.deliveryFee + maisoumenos,
                autoClose: this.state.dados.autoClose,
                deliveryTime: this.state.dados.deliveryTime,
                isOpen: this.state.dados.isOpen
            }})


        }catch{
            alert('Erro ao alterar a taxa de entrega restaurante')
        }
    }

    alterarTempoDeEntrega = async (maisoumenos) => {
        try{

        if(maisoumenos <= 0 && this.state.dados.deliveryTime <= 1) return

        if(maisoumenos > 0 && this.state.dados.deliveryTime >= 60) return

        this.setState({dados: {
            deliveryFee: this.state.dados.deliveryFee,
            autoClose: this.state.dados.autoClose,
            deliveryTime: this.state.dados.deliveryTime + maisoumenos,
            isOpen: this.state.dados.isOpen
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
                deliveryFee: this.state.dados.deliveryFee,
                autoClose: this.state.dados.autoClose
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

        // this.reloadInfo()
        window.location.href = '/dashboard/configuracao'
    }


    render(){
        return(
            <div className="container-home-config" style={{width: '30%'}}>
            <div style={{width: '100%', textAlign: 'center', marginBottom: '40px'}}>
                <h2> Configurações </h2> 
            </div>

            <div className="config-section">
                <p className="config-title"> Taxa de entrega: </p>
                <p className="config-cfg"> R${this.state.dados.deliveryFee}.00</p>
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
                <p className="config-cfg"> {this.state.dados.autoClose}:00h </p>
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
                <p className="config-cfg"> 00:{this.state.dados.deliveryTime}m </p>
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
        )
    }
}