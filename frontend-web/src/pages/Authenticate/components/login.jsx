import React from "react";
import loginImg from "../../../img/entrega-de-alimentos.svg";
import api from '../../../services/api'
import ReactLoading from 'react-loading';
import AlertBox from '../../components/alertBox';

export class Login extends React.Component {


  constructor(props) {
    super(props);
  }

  state = {
    token: '',
    isLoading: false,
    alert:{
      open: false,
      message: '',
      title: ''
    }
  }

  logar = async () => {
    const email = this.textEmailInput.value
    const password = this.textPassInput.value
    
    if(!( email && password)){
      this.alertar('Preencha todos os campos', 'Você precisa preencher todos os campos corretamente para efeturar o login')
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
        // alert(err.response.data.error)
        this.setState({alert:{open: true, title: err.response.data.error, message: 'Tente novamente'}})
        console.log(err.response.data.error)
        this.setState({isLoading: false})
        }catch{
          this.setState({isLoading: false})
          this.alertar('Erro ao conectar com o servidor', 'Nossos servidores provavelmente estão fora do ar, lamentamos a incoveniencia :/')
        }
      });
    }
  }

  alertar = (title, message) => {
    this.setState({alert:{open: true, title, message}})
  }
  

  seguirParaDashborad = (res) =>{
    console.log("Seguindo para Dashboard...")
    // console.log(res)
    if(!res.data.store.isValid){

      this.alertar('Restaurente em fase de avaliação', 'O Seu estabelecimente ainda está em fase de avaliação, assim que possivel mandaremos um e-mail confirmando o cadastro!')
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
        {this.state.alert.open && <AlertBox title={this.state.alert.title} message={this.state.alert.message} open={true} onClick={ () => { this.setState({alert: {open: false}})}}/>}
        <div className="headerLogin">Entrar</div>
        <div className="content">
          <div className="imageLogin">
            <img src={loginImg} alt="Imagem login" />
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
