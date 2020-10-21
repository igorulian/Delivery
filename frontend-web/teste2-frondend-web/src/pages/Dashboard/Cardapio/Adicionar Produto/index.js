import React , {Component} from 'react'
import './styles.css'
import NavBar from '../../components/NavBar'
import {IconContext} from 'react-icons'
import * as IoIcons from 'react-icons/io'
import * as AiIcons from 'react-icons/ai'
import {Link} from 'react-router-dom'
import api from '../../../../services/api'

export default class AddProduto extends Component{

    state = {
        ingredientCount: 0,
        ingredientes: [
            {
                numero: 0
            }
        ],
        ingredientesParaAdicionar: [{}],
        catID: ''
        
    }

    pegarID = () =>{
        // console.log(': ' + window.location.href)
        const catID = window.location.href.toString().replace('http://localhost:3000/dashboard/adicionar-produto/', '').replace(' ', '')
        // console.log('2: ' + catID)
        return catID
    }

    
    salvarProduto = async () => {
        const name = this.textNameInput.value
        const cost = this.textCostInput.value
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
            ingredient: ingredientes
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


    render(){
        return(
            <div className="page">
                <NavBar/>
                <div className="conteudo-adicionar-produtos">

                    <button onClick={() => this.seguirParaDashborad()} className="btnVoltarAoCardapio">
                        <IconContext.Provider value={{color: '#e3552f ', size: 30}} >
                            <AiIcons.AiOutlineArrowLeft/>
                        </IconContext.Provider>
                    </button>

                    <div className="container-adicionar-produtos">
                        <div className="form">
                            <div className="imgInput"> 
                                <a> Clique aqui </a>
                                <a> para enviar </a>
                                <a> a imagem </a>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Nome do produto</label>
                                <input ref={input => this.textNameInput = input} type="name" name="name" placeholder="Digite o nome do produto" />

                                <label htmlFor="preco">Preço</label>
                                <input ref={input => this.textCostInput = input} type="preco" name="preco" placeholder="Digite o preço" />

                                <label htmlFor="ingredientes">Ingredientes</label>

                            </div>

                            <div className="form-group-ingredientes">
                                {this.state.ingredientes.map(ingrediente =>(
                                    <div key={ingrediente.numero} className="form-group-ingredientes-item"> 

                                    <input key={ingrediente.numero} ref={input => this.textIngredientInput = input} id={`ingrediente${ingrediente.numero}`} type="ingredient" name={`ingrediente + ${ingrediente.numero}`} placeholder={`Digite o ingredienete`} />
                                    
                                    {/* <button onClick={() => this.removerIngrediente(ingrediente.numero)} className="btnAdicionarIngredienete">
                                    <IconContext.Provider value={{color: '#ff0000', size: 15}}>
                                        <IoIcons.IoMdCloseCircle/>
                                    </IconContext.Provider>
                                    </button> */}

                                    </div>

                                ))}

                            </div>

                            
                            <button onClick={() => this.adicionarIngrediente()} className="btnAdicionarIngredienete">
                                <IconContext.Provider value={{color: '#008000 ', size: 30}} >
                                    <IoIcons.IoMdAddCircle/>
                                </IconContext.Provider>
                            </button>

                            <button onClick={() => this.salvarProduto()} type="button" className="btn">
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
