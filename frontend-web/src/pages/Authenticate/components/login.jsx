import React from "react";
import loginImg from "../../../img/entrega-de-alimentos.svg";
import api from '../../../services/api'
import {useNavigate} from 'react-router-dom'
import ReactLoading from 'react-loading';

export class Login extends React.Component {


  constructor(props) {
    super(props);
  }

  state = {
    token: '',
    isLoading: false,
  }

  logar = async () => {
    const email = this.textEmailInput.value
    const password = this.textPassInput.value
    
    if(!( email && password)){
      alert('Preencha todos os campos!')
      return
    }

    if(email.length > 1 && password.length > 1){
      const auth = {
        email,
        password
      }
      console.log(auth)
      this.setState({isLoading: true})
      await api.post('/store/auth/authenticate', auth)
      .then(res => this.seguirParaDashborad(res))
      .catch(err => {
        this.limparLocalStorage()
        try{
        alert(err.response.data.error)
        console.log(err.response.data.error)
        }catch{
          alert('Erro ao conectar ao servidor :/')
        }
      });
    }
  }
  

  seguirParaDashborad = (res) =>{
    console.log("Seguindo para Dashboard...")
    // console.log(res)
    if(!res.data.store.isValid){
      alert('O Seu restaurante ainda não foi aprovado pela nossa equipe!')
      return
    }
    this.setState({token: res.data.token,storeid: res.data.store._id})
    
    localStorage.setItem('storeData', res.data)
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('id',res.data.store._id)
    localStorage.setItem('name', res.data.store.name)
    console.log(this.state.token)
    console.log(this.state.storeid)
    window.location.href = '/dashboard'
  }

  limparLocalStorage = () => {
    localStorage.setItem('token', '')
    localStorage.setItem('id','')
    localStorage.setItem('name', '')
  }

  render() {

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="headerLogin">Entrar</div>
        <div className="content">
          <div className="imageLogin">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group-login">
              <label htmlFor="username">Email</label>
              <input ref={input => this.textEmailInput = input} type="text" name="username" placeholder="Digite seu e-mail" />
            </div>
            <div className="form-group-login">
              <label htmlFor="password">Senha</label>
              <input ref={input => this.textPassInput = input} type="password" name="password" placeholder="Digite sua senha" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.logar.bind(this)} type="button" className="btn">
            {this.state.isLoading ? <ReactLoading type={'spin'} color={'#fff'} height={25} width={25} /> : 'Entrar'}
          </button>
        </div>
      </div>
    );
  }
}
