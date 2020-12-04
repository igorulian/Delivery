// PaoDeForma
import React, {Component} from 'react';
import api from '../../services/api'
import './PaoDeForma.css'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';

export default class PaoDeForma extends Component{


    logar = () => {
        const email = this.textEmailInput.value
        const password = this.textPassInput.value

        if(!email || !password){
            alert('Preecha todos os campos')
            return
        }

        
    }


    render(){
        return(   
            <div className="conteudo-paodeforma">
                <div className="container-login">
                    <h3> Painel do Administrador</h3> 
                    <div className="form-group-login">
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