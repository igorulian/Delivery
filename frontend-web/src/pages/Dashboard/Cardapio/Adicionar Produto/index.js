import React , {Component} from 'react'
import './styles.css'
import NavBar from '../../components/NavBar'
import {IconContext} from 'react-icons'
import * as IoIcons from 'react-icons/io'
import * as AiIcons from 'react-icons/ai'
import {Link} from 'react-router-dom'
import api from '../../../../services/api'

import ReactLoading from 'react-loading';

import Switch from "react-switch";
import Dropzone from 'react-dropzone'

import {DropContainer,UploadMessage} from './styles.js'


export default class AddProduto extends Component{

    state = {
        ingredientCount: 0,
        ingredientes: [
            {
                numero: 0
            }
        ],
        ingredientesParaAdicionar: [{}],
        catID: '',
        modoPizza: false,
        ativarIngrediente: false,
        isUploadingImage: false,
        imageUploaded: false
        
    }

    pegarID = () =>{
        // console.log(': ' + window.location.href)
        const catID = window.location.href.toString().replace('http://localhost:3000/dashboard/adicionar-produto/', '').replace(' ', '')
        // console.log('2: ' + catID)
        return catID
    }


    getImageUrl = () => {

        if(this.state.uploadedFile){
            if(this.state.uploadedFile.location){
               return this.state.uploadedFile.location
            }else{
                return ''
            }
        }else{
            return ''
        }
    }
    
    salvarProduto = async () => {
        const name = this.textNameInput.value
        const cost = this.textCostInput.value

        if(this.state.isUploadingImage && this.state.imageUploaded === false){
            alert('Aguarded o upload da imagem completar')
            return
        }

        if(!this.isNumber(cost)){
            alert("Digite apenas numeros")
            return
        }
        const ingredientes = this.getIngredientes()
        const category = this.pegarID()

        if(!name || !cost){
            alert('Preencha todos os campos')
            return
        }

        if(!ingredientes){
            alert('Preencha todos os campos')
            return
        }


        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')

        // const valor = $('.form-group-ingredientes.')

        console.log(token)
        console.log(id)



        const newProduct = {
            name,
            cost,
            category,
            ingredient: ingredientes,
            imageUrl: this.getImageUrl()
        }

        await api.post(`/store/products/add/${id}`,newProduct,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }).then(res => {this.seguirParaDashborad()})
            .catch(err => {console.log(err)})

        

    }

    isNumber = (n) => {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    
    

    seguirParaDashborad = () => {
        window.location.href = '/dashboard/cardapio'
        // console.log(res)
    }

    getIngredientes = () =>{
        const ingredientes = []
        for(var x = 0; x <= this.state.ingredientCount; x++){
            if(!document.getElementById(`ingrediente${x}`)) return []
            const valor = document.getElementById(`ingrediente${x}`).value
            if(valor){

                const newIngredient = {
                    name: valor
                }

                ingredientes.push(newIngredient)

            }

        }

        return ingredientes

    }

    adicionarIngrediente = () =>{
        const newIngred = { name: "", numero: this.state.ingredientCount + 1}
        this.setState({ 
            ingredientes: this.state.ingredientes.concat([newIngred])
          })
        this.setState({ingredientCount: this.state.ingredientCount + 1})
    }

    removerIngrediente = (numero) =>{
        var index = this.state.ingredientes.indexOf(numero);
        this.setState({ingredientes: this.state.ingredientes.splice(index,1)})
        this.setState({ingredientCount: this.state.ingredientCount - 1})
    }

    swichPizzaChange = () => {
        this.setState({modoPizza: !this.state.modoPizza})
    }

    ativarDesativarIngrediente = () => {
        this.setState({ativarIngrediente: !this.state.ativarIngrediente})
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
        this.setState({uploadingFile: file[0]})
        this.setState({isUploadingImage: true})

        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')

        const image = new FormData()

        console.log(file[0])

        image.append('file', file[0], file[0].name)

        await api.post(`/store/upload/image/${id}`,image,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }).then(res => {
            this.setState({imageUploaded: true, uploadedFile: res.data})
          }).catch(err => {console.log(err)})

        }catch{
            alert('Erro ao enviar imagem')
        }

    }

    cancelarEnvioDaImagem = async() => {
        try{
            const token = localStorage.getItem('token')
            const id = localStorage.getItem('id')

            if(this.state.isUploadingImage === true && this.state.imageUploaded === true){

                const imageid = this.state.uploadedFile.key

                try{
                    await api.delete(`/store/upload/image/delete/${id}/${imageid}`,{
                        headers: {
                        'Authorization': `Bearer ${token}` 
                        }
                    }).then(res => {}).catch(err => {console.log(err)})
                }catch{
                    alert('erro ao deletar imagem 2')
                }

            }
            
        this.setState({isUploadingImage: false,uploadingFile: {}, imageUploaded: false})
        }catch{
            alert('erro ao deletar imagem')
        }
    }

    render(){
        return(
            <div className="page">
                <NavBar/>
                <div className="conteudo-adicionar-produtos">
                
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>

                    <Link to={'/dashboard/cardapio'} style={{height: 'justifyContent'}}>
                            <IconContext.Provider value={{color: '#e3552f ', size: 30}} >
                                <AiIcons.AiOutlineArrowLeft/>
                            </IconContext.Provider>
                    </Link>


                    <div className="container-adicionar-produtos">
                        {/* <button> TEste </button> */}
                        <div className="switch">
                            <p> Pizza: </p>
                            <Switch onChange={() => this.swichPizzaChange() } onColor={'#e3552f'} width={40} height={20} checked={this.state.modoPizza} activeBoxShadow={null} />
                        </div>
                        <div className="form">
                                {this.state.isUploadingImage === false &&
                                    
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
                                }

                            {this.state.isUploadingImage === true  &&
                            <div style={{width: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                                <img alt="Imagem enviada" style={{width: '140px', height: '140px', marginBottom: '10px', opacity: this.state.imageUploaded ? '100%' : '50%'}} src={URL.createObjectURL(this.state.uploadingFile)}></img>
                                <button onClick={() => this.cancelarEnvioDaImagem()} style={{position: 'absolute',width: '20px', height: '20px', borderStyle: 'none', color: '#fff', backgroundColor: '#cf4a4a', borderRadius: '30px', cursor: 'pointer' , marginBottom: '160px', marginLeft: '140px'}}> X </button>
                            </div>
                            }

                            {this.state.imageUploaded === false && this.state.isUploadingImage === true &&
                            <div style={{position: 'absolute', marginTop: '70px'}}>
                                <ReactLoading type={'bars'} color={'#e3552f'} height={30} width={30} />
                             </div>
                            }

                            <div className="form-group">
                                <label htmlFor="name">Nome do produto</label>
                                <input ref={input => this.textNameInput = input} type="name" name="name" placeholder="Digite o nome do produto" />

                                <label htmlFor="preco">Preço</label>
                                <input ref={input => this.textCostInput = input} type="number" onkeyup="value=isNaN(parseFloat(value))?1000:value" name="preco" placeholder="Digite o preço" />

                                <div style={{display: 'flex', width: '100%'}}>
                                <label htmlFor="ingredientes">Ingredientes: </label>
                                <div style={{marginTop: '4px', marginLeft: '5px'}}>
                                <Switch onChange={() => this.ativarDesativarIngrediente() } onColor={'#e3552f'} width={40} height={20} checked={this.state.ativarIngrediente} activeBoxShadow={null} />
                                </div>

                                </div>

                            </div>

                            {this.state.ativarIngrediente === true &&
                            <div className="form-group-ingredientes">
                                {this.state.ingredientes.map(ingrediente =>(

                                    <input key={ingrediente.numero} ref={input => this.textIngredientInput = input} id={`ingrediente${ingrediente.numero}`} type="ingredient" name={`ingrediente + ${ingrediente.numero}`} placeholder={`Digite o ingredienete`} />

                                ))}

                            </div>
                            }
                            

                            {this.state.ativarIngrediente === true && 
                            <>

                            <button onClick={() => this.adicionarIngrediente()} className="btnAdicionarIngredienete">
                                <IconContext.Provider value={{color: '#008000 ', size: 30}} >
                                    <IoIcons.IoMdAddCircle/>
                                </IconContext.Provider>
                            </button>
                            
                            </>
                            }

                            <button onClick={() => this.salvarProduto()} type="button" className="btn">
                                Salvar
                            </button>
                        </div>
                    </div>

                    </div>

                </div>
            </div>
        )
    }
}
