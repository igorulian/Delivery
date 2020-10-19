import React from "react";
import loginImg from "../../../img/hamburguer.svg";
import api from '../../../services/api'
// import Popup from 'reactjs-popup';

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  registrar = async () => {
    const name = this.textNameInput.value
    const email = this.textEmailInput.value
    const password = this.textPassInput.value
    const rua = this.textRuaInput.value
    const numero = this.textNumeroInput.value
    const bairro = this.textBairroInput.value
    const cnpj = this.textCnpjInput.value
    const cep = this.textCepInput.value
    const auth = {
      name,
      email,
      password,
      address: {
        rua,
        numero,
        bairro,
        cep
      },
      cnpj
    }
    console.log(auth)
    await api.post('/store/auth/register', auth)
    .then(res => this.seguirParaDashboard(res))
    .catch(err => {
      localStorage.setItem('token', '')
      localStorage.setItem('id','')
      console.log(err.response.data.error)
    });

  }

  seguirParaDashboard = async (res) =>{
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
        {/* <Popup trigger={this.registrar} position="right center">
          <div>Popup content here !!</div>  
        </Popup> */}
        <div className="headerRegister">Registre-se</div>
        <div className="content">
          <div className="imageRegister">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="username">Restaurante</label>
                <input ref={input => this.textNameInput = input} type="text" name="username" placeholder="Digite o nome do seu restaurante" />
              </div>
              <div className="form-group-register">
                <label htmlFor="email">Email</label>
                <input ref={input => this.textEmailInput = input} type="text" name="email" placeholder="Digite seu email" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="password">Senha</label>
                <input ref={input => this.textPassInput = input} type="text" name="password" placeholder="Digite sua senha" />
              </div>
              <div className="form-group-register">
                <label htmlFor="cep">CEP</label>
                <input ref={input => this.textCepInput = input} type="text" name="cep" placeholder="Digite o cep" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="rua">Rua</label>
                <input ref={input => this.textRuaInput = input} type="text" name="rua" placeholder="Digite a rua do seu retaurante" />
              </div>
              <div className="form-group-register">
                <label htmlFor="numero">Numero</label>
                <input ref={input => this.textNumeroInput = input} type="text" name="numero" placeholder="Digite p numero do seu restaurante" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="bairro">Bairro</label>
                <input ref={input => this.textBairroInput = input} type="text" name="bairro" placeholder="Digite o bairro do seu retaurante" />
              </div>
              <div className="form-group-register">
                <label htmlFor="cnpj">CNPJ</label>
                <input ref={input => this.textCnpjInput = input} type="text" name="cnpj" placeholder="Digite o cnpj do seu restaurante" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.registrar.bind(this)} type="button" className="btn">
            Registrar
          </button>
        </div>
      </div>
    );
  }
}
