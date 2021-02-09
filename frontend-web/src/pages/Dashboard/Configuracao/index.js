import React, {Component} from 'react';
import api from '../../../services/api'
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './cfg-styles.css'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';
import Dropzone from 'react-dropzone'
import PhoneInput, {isValidPhoneNumber}from 'react-phone-number-input'
import Input from 'react-phone-number-input/input'

import {DropContainer,UploadMessage} from './imageUploadComponents.js'

export default class Configuracao extends Component{

    state = {
        dados: {
            nome: '',
            rua: '',
            numero: '',
            bairro: '',
        },
        isLoading: true,
        isUploadingFile: false
    }

    constructor(){
        super()
        this.setState({isLoading: true})
    }

    async componentDidMount(){
        await this.carregarInformacoes()
        this.setState({isLoading: false})
    }

    renderDrageMessage = (isDragActive, isDragReject) => {
        if (!isDragActive){
            return <UploadMessage> Arraste sua imagem aqui</UploadMessage>
        }
        if(isDragReject){
            return <UploadMessage type="error"> Arquivo não suportado </UploadMessage>
        }

        return <UploadMessage type="sucess"> Solte os arquivos aqui</UploadMessage>
    }

    enviarImagem = async (file) => {
        try{
            //URL.createObjectURL(file) // URL.createObjectURL(file[0])
            this.setState({dados:{imageUrl: URL.createObjectURL(file[0]), phoneNumber: this.state.dados.phoneNumber}})

            const token = localStorage.getItem('token')
            const id = localStorage.getItem('id')

            const image = new FormData()

            console.log(file[0])

            image.append('file', file[0], file[0].name)

            this.setState({isUploadingFile: true})

            await api.post(`/store/upload/image/${id}`,image,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            }).then(res => {
                this.setState({uploadedFile: res.data, 
                                dados:{
                                    imageUrl: res.data.location,
                                    phoneNumber: this.state.dados.phoneNumber
                                },
                                isUploadingFile: false})
            }).catch(err => {
                console.log(err)
                this.setState({isUploadingFile: false})
                alert('Erro ao enviar a imagem, tente uma imagem menor')
            })

        }catch{
            alert('Erro ao enviar imagem')
        }

    }

    cancelarEnvioDaImagem = async() => {
        try{
            const token = localStorage.getItem('token')
            const id = localStorage.getItem('id')

            // if(this.state.dados.imageUrl != ''){

                const imageid = this.state.dados.imageUrl.split('m/')[1]

                try{
                    const data = {
                        imageUrl: ''
                    }
        
                    await api.post(`/store/update/${id}`,data,{
                        headers: {
                        'Authorization': `Bearer ${token}` 
                        }
                    })
                }catch{
                    alert('Erro ao deletar imagem 2')
                }

                try{
                    await api.delete(`/store/upload/image/delete/${id}/${imageid}`,{
                        headers: {
                        'Authorization': `Bearer ${token}` 
                        }
                    }).then(res => {}).catch(err => {console.log(err)})
                }catch{
                    alert('Erro ao deletar imagem')
                }

            

            this.setState({
                dados:{
                    imageUrl: '',
                    phoneNumber: this.state.dados.phoneNumber
                }
            })


        }catch{
            alert('erro ao deletar imagem')
        }
    }

    carregarInformacoes = async () =>{
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const response = await api.get(`/store/show/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })

            const {name, imageUrl,  phoneNumber} = response.data
            // const {rua, numero, bairro} = response.data.address

            this.setState({dados:{
                nome: name,
                imageUrl,
                phoneNumber
            }})


        }catch{
            alert('Erro ao carregar dados.')
        }
    }

    atualizarInformacoes =  async() => {
        try{
            const name = this.nameInput.value
            const telefone = this.state.dados.phoneNumber

            // alert(telefone)

            if(!(name && telefone)){
                alert('Preencha todos os campos!')
                return
            }

            if(!isValidPhoneNumber(telefone)){
                alert('Numero de telefone invalido!')
                return
            }

            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')

                const data = {
                    name,
                    imageUrl : this.state.dados.imageUrl,
                    phoneNumber: telefone
                }
    
                await api.post(`/store/update/${id}`,data,{
                    headers: {
                    'Authorization': `Bearer ${token}` 
                    }
                })

            alert('Informações atualizadas com sucesso!')
            localStorage.setItem('imageUrl', this.state.uploadedFile ? this.state.uploadedFile.location : '')
            localStorage.setItem('name', name)

        }catch{
            alert('Erro ao atualizar Informações!')
        }
    }

    render(){

        if(this.state.isLoading){
            return (
                <div className='page'>
                <NavBar/>
                    <div className="conteudo">
                        <div className="loading">
                            <ReactLoading type={'spin'} color={'#e3552f'} height={1000} width={100} />
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <>
            <NavBar/>
                <div className='conteudo'>
                <div className='container-config' style={{marginBottom: '100px'}}>
                    <h2 style={{marginBottom: '15px'}}> Configurações </h2>

                    {this.state.dados.imageUrl == '' && 
                    <div style={{width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                        <Dropzone accept="image/*" onDropAccepted={(file) => this.enviarImagem(file)}>
                            { ({getRootProps, getInputProps, isDragActive, isDragReject}) => (
                                <DropContainer {...getRootProps()}
                                isDragActive={isDragActive}
                                isDragReject={isDragReject}
                                >

                                <input {...getInputProps()}/>

                                {this.renderDrageMessage(isDragActive, isDragReject)}

                                </DropContainer>
                            )}
                        </Dropzone>
                        </div>
                    }

                    {this.state.dados.imageUrl != '' &&
                        <>
                            <div style={{width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                <img style={{width: '140px', height: '140px', marginBottom: '10px', opacity: this.state.isUploadingFile === false ? '100%' : '50%'}} src={this.state.dados.imageUrl}></img>
                                <button onClick={() => this.cancelarEnvioDaImagem()} style={{position: 'absolute',width: '20px', height: '20px', borderStyle: 'none', color: '#fff', backgroundColor: '#cf4a4a', borderRadius: '30px', cursor: 'pointer' , marginBottom: '160px', marginLeft: '140px'}}> X </button>
                            </div>
                        </>
                    }

                    <div className="form" style={{marginTop: '0px'}}>

                        <div className="form-group">
                            <label htmlFor="name">Nome do Restaurante</label>
                            <input ref={input => this.nameInput = input} style={{minWidth: '16em'}} type="name" name="name" placeholder="Digite o nome do restaurante" defaultValue={this.state.dados.nome}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefone">Telefone</label>
                            {/* <input ref={input => this.telInput = input} style={{minWidth: '16em'}} type="tel" id="phone" name="phone" pattern="[+]{1}[0-9]{11,14}" placeholder="Digite o telefone do restaurante" defaultValue={this.state.dados.email}/> */}
                            <Input style={{minWidth: '16em'}} placeholder="Digite o numero de telefone" value={this.state.dados.phoneNumber}  country="BR" onChange={ (value) => {this.setState({dados:{phoneNumber: value, imageUrl: this.state.dados.imageUrl}})}} countryCallingCodeEditable={false}/>
                            </div>
                        </div>
                    <button className='btnSalvar' onClick={ () => this.atualizarInformacoes()}> Salvar </button>
                </div>
                </div>
            </>
        );
    }
    
}
