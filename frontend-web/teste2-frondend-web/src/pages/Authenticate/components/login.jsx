import React from "react";
import loginImg from "../../../img/entrega-de-alimentos.svg";
import api from '../../../services/api'
import {useNavigate} from 'react-router-dom'

export class Login extends React.Component {


  constructor(props) {
    super(props);
  }

  state = {
    token: '',
  }

  logar = async () => {
    const email = this.textEmailInput.value
    const password = this.textPassInput.value
    if(email.length > 1 && password.length > 1){
      const auth = {
        email,
        password
      }
      console.log(auth)
      await api.post('/store/auth/authenticate', auth)
      .then(res => this.seguirParaDashborad(res))
      .catch(err => {
        alert(err.response.data.error)
        console.log(err.response.data.error)
      });
    }
  }
  

  seguirParaDashborad = (res) =>{
    console.log("Seguindo para Dashboard...")
    console.log(res)
    this.setState({token: res.data.token,storeid: res.data.store._id})
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('id',res.data.store._id)
    console.log(this.state.token)
    console.log(this.state.storeid)
    window.location.href = '/dashboard'
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
            Entrar
          </button>
        </div>
      </div>
    );
  }
}
