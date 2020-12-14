import React from "react";
import loginImg from "../../../img/hamburguer.svg";
import api from '../../../services/api'
// import Popup from 'reactjs-popup';
import ReactLoading from 'react-loading';

export class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { 
    isLoading: false
  }

  validarCnpj = async (cnpj) => {

    return true
  }

// de74446625d122e5d6281a478f3ca8136b84ba2d58dfcc8dcbe1a871a38ebac8

  registrar = async () => {
    const name = this.textNameInput.value
    const email = this.textEmailInput.value
    const password = this.textPassInput.value
    const confirmpassword = this.textConfirmPassInput.value
    const rua = this.textRuaInput.value
    const numero = this.textNumeroInput.value
    const bairro = this.textBairroInput.value
    const cnpj = this.textCnpjInput.value
    const cep = this.textCepInput.value

    if(!(name && email && password && rua && numero && bairro && cnpj && cep)){
      alert('Preencha todos os campos')
      return
    }
    if (!(password === confirmpassword)){
      alert('Senhas não correspondem')
      return
    }
    
    this.setState({isLoading: true})
    const validarCNPJ = await this.validarCnpj(cnpj)

    if( ! validarCNPJ ){ alert('CNPJ Inválido'); return; }

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
      this.setState({isLoading: false})
      try{
      console.log(err.response.data.error)
      alert(err.response.data.erro)
      }catch{
        alert('Erro ao conectar ao servidor :/')
      }
    });

  }

  seguirParaDashboard = async (res) =>{
    console.log("Seguindo para Dashboard...")

    if(!res.data.store.isValid){
      alert('O Seu restaurante foi enviado para análise! Aguarde que dentro de algumas horas receberá um email com a confirmação de validação :)')
      return
    }

    this.setState({token: res.data.token,storeid: res.data.store._id})
    localStorage.setItem('storeData', res.data)
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
          {/* <div className="imageRegister">
            <img src={loginImg} />
          </div> */}
          <div className="form">
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="username">Restaurante</label>
                <input ref={input => this.textNameInput = input} type="text" name="username" placeholder="Digite o nome " />
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
                <label htmlFor="password">Repitir Senha</label>
                <input ref={input => this.textConfirmPassInput = input} type="text" name="password" placeholder="Digite sua senha" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="rua">Rua</label>
                <input ref={input => this.textRuaInput = input} type="text" name="rua" placeholder="Digite a rua" />
              </div>
              <div className="form-group-register">
                <label htmlFor="numero">Numero</label>
                <input ref={input => this.textNumeroInput = input} type="text" name="numero" placeholder="Digite o numero" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="bairro">Bairro</label>
                <input ref={input => this.textBairroInput = input} type="text" name="bairro" placeholder="Digite o bairro" />
              </div>
              <div className="form-group-register">
                <label htmlFor="cep">CEP</label>
                <input ref={input => this.textCepInput = input} type="text" name="cep" placeholder="Digite o cep" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="cnpj">CNPJ</label>
                <input ref={input => this.textCnpjInput = input} type="text" name="cnpj" placeholder="Digite o cnpj" />
              </div>
              <div className="form-group-register">
                <label htmlFor="telefone">Telefone</label>
                <input ref={input => this.textTelefoleInput = input} type="text" name="telefone" placeholder="Digite seu telefone" />
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <button onClick={this.registrar.bind(this)} type="button" className="btn">
            {this.state.isLoading ? 
            <ReactLoading type={'spin'} color={'#fff'} height={25} width={25} /> : "Registrar"}
            {/* Registrar */}
          </button>
        </div>
      </div>
    );
  }
}
