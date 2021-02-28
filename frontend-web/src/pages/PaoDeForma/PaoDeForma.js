// PaoDeForma
import React, {Component} from 'react';
import api from '../../services/api'
import './PaoDeForma.css'

export default class PaoDeForma extends Component{


    logar = async () => {
        const email = this.textEmailInput.value
        const password = this.textPassInput.value

        if(!email || !password){
            alert('Preecha todos os campos')
            return
        }

        const request = {
            email,
            password
        }
        
        console.log(request)
        await api.post(`/adm/auth/authenticate`,request, {})
            .then(res => {this.seguirParaDashborad(res)})
            .catch(err => {console.log(err)})
    }

    seguirParaDashborad = (res) => {
        localStorage.setItem('admtoken', res.data.token)
        alert('Logado com sucesso!')
        console.log(localStorage.getItem('admtoken'))
        window.location.href ='/paodeforma/dashboard'

    }


    render(){
        return(   
            <div className="conteudo-paodeforma">
                <div className="container-login">
                    <h3> Painel do Administrador</h3> 
                    <div className="form-group-login-pao-de-forma">
                        <label htmlFor="username">Email</label>
                        <input ref={input => this.textEmailInput = input} type="text" name="username" placeholder="Digite seu Email" />
                        <label htmlFor="password">Senha</label>
                        <input ref={input => this.textPassInput = input} type="text" name="password" placeholder="Digite sua Senha" />
                    </div>
                    <button onClick={ () => this.logar()}> LOGAR </button>
                </div>
            </div>
        )
    }


}