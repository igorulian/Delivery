import React, {Component} from 'react'
import api from '../../../../services/api'
import './ConfigGeral.css'
import Switch from "react-switch";

export default class ConfigPagamento extends Component{      

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
        this.props.reloadInfo()
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
    }


    render(){
        return(
            <div className="container-home-config" style={{width: '23%'}}>
                <div style={{width: '100%', textAlign: 'center', marginBottom: '40px'}}>
                    <h2> Métodos de Pagamento </h2> 
                </div>

                <div className="config-section">
                    <p className="config-title">💵 Dinheiro: </p>
                    <div className="config-cfg" style={{marginRight: '15px'}}>
                        <Switch onChange={() => {} } onColor={'#e3552f'} width={64} height={32} activeBoxShadow={null}/>
                    </div>
                </div>
                
                <div className="line">&nbsp;</div>

                <div className="config-section">
                    <p className="config-title">💳 Cartão: </p>
                    <div className="config-cfg" style={{marginRight: '15px'}}>
                        <Switch onChange={() => {} } onColor={'#e3552f'} width={64} height={32} activeBoxShadow={null}/>
                    </div>
                </div>

                <div className="line">&nbsp;</div>

                <div className="config-section">
                    <p className="config-title">🤑 Picpay: </p>
                    <div className="config-cfg" style={{marginRight: '15px'}}>
                        <Switch onChange={() => {} } onColor={'#e3552f'} width={64} height={32} activeBoxShadow={null}/>
                    </div>
                </div>

                <div className="line">&nbsp;</div>

                <div className="config-section">
                    <p className="config-title">💰 Fiado: </p>
                    <div className="config-cfg" style={{marginRight: '15px'}}>
                        <Switch onChange={() => {} } onColor={'#e3552f'} width={64} height={32} activeBoxShadow={null}/>
                    </div>
                </div>

                <div className="div-btn-atualizar">
                    <button onClick={() => this.atualizarDados()}> Atualizar </button>
                </div>
            </div>
        )
    }
}