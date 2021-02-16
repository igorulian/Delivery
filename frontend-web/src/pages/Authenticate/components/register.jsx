import React from "react";
import loginImg from "../../../img/hamburguer.svg";
import api from '../../../services/api'
// import Popup from 'reactjs-popup';
import ReactLoading from 'react-loading';
import PhoneInput, {isValidPhoneNumber}from 'react-phone-number-input'
import Input from 'react-phone-number-input/input'
import { FormattedInput } from "@buttercup/react-formatted-input";
import AlertBox from '../../components/alertBox';
import Axios from 'axios'

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.isCEPvalid('14955000')
  }

  state = { 
    isLoading: false,
    dados: {
      cnpj: '',
      cep: '',
      phoneNumber: '',
      numero: ''
    },
    alert:{
      open: false,
      message: '',
      title: ''
    }
  }

  isCNPJvalid = async (cnpj) => {

    return true
  }

  isCEPvalid = async (cep) => {

    // const apigeral = Axios.create({})

    // const response = apigeral.get('https://brasilapi.com.br/api/cep/v1/14955000')
    // console.log(response.data)


    return true
  }


  registrar = async () => {
    const name = this.textNameInput.value.trim()
    const email = this.textEmailInput.value.trim()
    const password = this.textPassInput.value.trim()
    const confirmpassword = this.textConfirmPassInput.value.trim()
    const rua = this.textRuaInput.value.toLowerCase().replace('rua', '').trim()
    const numero = this.state.dados.numero.trim()
    const bairro = this.textBairroInput.value.trim()
    const cnpj = this.state.dados.cnpj.trim()
    const cep = this.state.dados.cep.trim()
    const phoneNumber = this.state.dados.phoneNumber

    this.setState({isLoading: true})

    if(!(name && email && password && rua && numero && bairro && cnpj && cep)){
      this.alertar('Preencha todos os campos','É necessario preencher todos os campos para efetuar o cadastro corretamente')
      this.setState({isLoading: false})
      return
    }
    if (!(password === confirmpassword)){
      this.alertar('Senhas não correspondem','É necessario digitar a mesma senha nos dois campos')
      this.setState({isLoading: false})
      return
    }

    if(!isValidPhoneNumber(phoneNumber)){
      this.alertar('Numedo de telefone inválido','É necessario preencher o campo com um número de telefone válido')
      this.setState({isLoading: false})
      return
  }

    if(!await this.isCEPvalid(cep)){
      this.alertar('CEP inválido', 'É Necessario preencher o campo com um CEP válido')
      this.setState({isLoading: false})
      return
    }

    if(! await this.isCNPJvalid(cnpj)){
      this.alertar('CNPJ Inválido','É necessario preencher o campo com um CNPJ válido')
      this.setState({isLoading: false})
      return
    }

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
      cnpj,
      phoneNumber
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

      this.alertar(err.response.data.error, '')
      }catch{
        this.alertar('Erro ao conectar com o servidor', 'Nossos servidores provavelmente estão fora do ar, lamentamos a incoveniencia :/')
      }
    });

  }

  seguirParaDashboard = async (res) =>{
    console.log("Seguindo para Dashboard...")

    if(!res.data.store.isValid){
      this.setState({isLoading: false})
      this.alertar('Restaurante enviado para análise','Aguarde que dentro de algumas horas receberá um email com a confirmação de validação :)')
      window.location.href = '/'
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

  alertar = (title, message) => {
    this.setState({alert:{open: true, title, message}})
  }


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>

        {this.state.alert.open && <AlertBox title={this.state.alert.title} message={this.state.alert.message} open={true} onClick={ () => { this.setState({alert: {open: false}})}}/>}
        
        <div className="headerRegister">Registre-se</div>
        <div className="content">
          {/* <div className="imageRegister">
            <img src={loginImg} />
          </div> */}
          <div className="form">
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="username">Restaurante</label>
                <input ref={input => this.textNameInput = input} type="text" name="username" placeholder="Digite o nome do restaurante" />
              </div>
              <div className="form-group-register">
                <label htmlFor="email">Email</label>
                <input ref={input => this.textEmailInput = input} type="text" name="email" placeholder="Digite seu email" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="password">Senha</label>
                <input ref={input => this.textPassInput = input} type="password" name="password" placeholder="Digite sua senha" />
              </div>
              <div className="form-group-register">
                <label htmlFor="password">Repetir Senha</label>
                <input ref={input => this.textConfirmPassInput = input} type="password" name="password" placeholder="Digite sua senha" />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="rua">Rua</label>
                <input ref={input => this.textRuaInput = input} type="text" name="rua" placeholder="Digite a rua do restaurante" />
              </div>
              <div className="form-group-register">
                <label htmlFor="numero">Numero</label>
                {/* <input ref={input => this.textNumeroInput = input} type="text" name="numero" placeholder="Digite o numero" /> */}
                <FormattedInput
                className="formatted-input"
                format={[ { char: /\d/, repeat: 6 } ]}
                onChange={(formattedValue, raw) => { this.setState({dados:{...this.state.dados, numero: raw}}) }}
                placeholder="Digite o numero"
                />
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="bairro">Bairro</label>
                <input ref={input => this.textBairroInput = input} type="text" name="bairro" placeholder="Digite o bairro do restaurante" />
              </div>
              <div className="form-group-register">
                <label htmlFor="cep">CEP</label>
                <FormattedInput
                className="formatted-input"
                format={[
                  { char: /\d/, repeat: 5 },
                  { exactly: "-" },
                  { char: /\d/, repeat: 3 }, ]}
                onChange={(formattedValue, raw) => { this.setState({dados:{...this.state.dados, cep: raw}}) }}
                placeholder="Digite o CEP"
                />
                {/* <input ref={input => this.textCepInput = input} type="text" name="cep" placeholder="Digite o cep" /> */}
              </div>
            </div>
            <div className="form2">
              <div className="form-group-register">
                <label htmlFor="cnpj">CNPJ</label>
                <FormattedInput         
                    className="formatted-input"
                    format={[
                      { char: /\d/, repeat: 2 },
                      { exactly: "." },
                      { char: /\d/, repeat: 3 },
                      { exactly: "." },
                      { char: /\d/, repeat: 3 },
                      { exactly: "/" },
                      { char: /\d/, repeat: 4 },
                      { exactly: "-" },
                      { char: /\d/, repeat: 2 } ]}
                    onChange={(formattedValue, raw) => { this.setState({dados:{...this.state.dados, cnpj: raw}}) }}
                    placeholder="Digite o CNPJ"
                    />
              </div>
              <div className="form-group-register">
                <label htmlFor="telefone">Telefone</label>
                <Input placeholder="Digite o numero de telefone"  country="BR" onChange={ (value) => {this.setState({dados:{...this.state.dados, phoneNumber: value}})}} countryCallingCodeEditable={false}/>
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
