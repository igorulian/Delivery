import React , {Component} from 'react'
import './styles.css'
import NavBar from '../../components/NavBar'
import {IconContext} from 'react-icons'
import * as IoIcons from 'react-icons/io'
import * as AiIcons from 'react-icons/ai'
import {Link} from 'react-router-dom'
import api from '../../../../services/api'

import Switch from "react-switch";


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
        ativarIngrediente: false
        
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

    swichPizzaChange = () => {
        this.setState({modoPizza: !this.state.modoPizza})
    }

    ativarDesativarIngrediente = () => {

        this.setState({ativarIngrediente: !this.state.ativarIngrediente})
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
                            <div className="imgInput"> 
                                <a> Clique aqui </a>
                                <a> para enviar </a>
                                <a> a imagem </a>
                            </div>
                            {this.state.modoPizza == false && 
                            <>
                            <div className="form-group">
                                <label htmlFor="name">Nome do produto</label>
                                <input ref={input => this.textNameInput = input} type="name" name="name" placeholder="Digite o nome do produto" />

                                <label htmlFor="preco">Preço</label>
                                <input ref={input => this.textCostInput = input} type="preco" name="preco" placeholder="Digite o preço" />

                                <div style={{display: 'flex', width: '100%'}}>
                                <label htmlFor="ingredientes">Ingredientes: </label>
                                <div style={{marginTop: '4px', marginLeft: '5px'}}>
                                <Switch onChange={() => this.ativarDesativarIngrediente() } onColor={'#e3552f'} width={40} height={20} checked={this.state.ativarIngrediente} activeBoxShadow={null} />
                                </div>

                                </div>

                            </div>

                            {this.state.ativarIngrediente == true &&
                            <div className="form-group-ingredientes">
                                {this.state.ingredientes.map(ingrediente =>(

                                    <input key={ingrediente.numero} ref={input => this.textIngredientInput = input} id={`ingrediente${ingrediente.numero}`} type="ingredient" name={`ingrediente + ${ingrediente.numero}`} placeholder={`Digite o ingredienete`} />

                                ))}

                            </div>
                            }
                            </>
                            }
                            {this.state.modoPizza == true && 
                                <>
                                <div className="form-group">
                                    <label htmlFor="name">Tipo da pizza</label>
                                    <input ref={input => this.textNameInput = input} type="name" name="name" placeholder="Digite o nome do produto" />
    
                                    <label htmlFor="preco">Tamanhos:</label>
                                    {/* <input ref={input => this.textCostInput = input} type="preco" name="preco" placeholder="Digite o preço" /> */}
                                    <div style={{display: "flex", justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '10px', marginTop:'10px'}}>
                                        <div className={'switchTamanhos'}>
                                            <p> Pequeno </p>
                                            <p style={{height: 'Fitcontent'}}> R$ <input style={{padding: 0,paddingLeft: '10px', marginBottom: '5px'}} className={"inputNumber"} defaultValue={30} type={'number'} min="1" max={99}/> </p>
                                            <Switch onChange={() => {} } onColor={'#e3552f'} width={40} height={20} checked={true} activeBoxShadow={null} />
                                        </div>

                                        <div className={'switchTamanhos'}>
                                            <p> Médio </p>
                                            <p style={{height: 'Fitcontent'}}> R$ <input style={{padding: 0,paddingLeft: '10px', marginBottom: '5px'}} className={"inputNumber"} defaultValue={40} type={'number'} min="1" max={99}/> </p>
                                            <Switch onChange={() => {}} onColor={'#e3552f'} width={40} height={20} checked={true} activeBoxShadow={null} />
                                        </div>

                                        <div className={'switchTamanhos'}>
                                            <p> Grande </p>
                                            <p style={{height: 'Fitcontent'}}> R$ <input style={{padding: 0,paddingLeft: '10px', marginBottom: '5px'}} className={"inputNumber"} defaultValue={50} type={'number'} min="1" max={99}/> </p>
                                            <Switch onChange={() => {}} onColor={'#e3552f'} width={40} height={20} checked={true} activeBoxShadow={null} />
                                        </div>
                                    </div>

                                    <label htmlFor="ingredientes">Maximo de sabores: <input style={{padding: 0,paddingLeft: '10px'}} className={"inputNumber"} defaultValue={3} type={'number'} min="1" max="99"/> </label>

                                    {this.state.modoPizza == false && 
                                    <label htmlFor="ingredientes">Sabores:</label>
                                    }
    
                                </div>
    
                                {this.state.modoPizza == false && 
                                <div className="form-group-ingredientes">
                                    {this.state.ingredientes.map(ingrediente =>( 

                                        <input key={ingrediente.numero} ref={input => this.textIngredientInput = input} id={`ingrediente${ingrediente.numero}`} type="ingredient" name={`ingrediente + ${ingrediente.numero}`} placeholder={`Digite o sabor`} />
    
                                    ))}
    
                                </div>
                                }
                                
                                </>
                            }

                            {this.state.ativarIngrediente == true && 
                            <>
                            {this.state.modoPizza == false && 
                            <button onClick={() => this.adicionarIngrediente()} className="btnAdicionarIngredienete">
                                <IconContext.Provider value={{color: '#008000 ', size: 30}} >
                                    <IoIcons.IoMdAddCircle/>
                                </IconContext.Provider>
                            </button>
                            }
                            </>
                            }

                            <button onClick={() => this.salvarProduto()} type="button" className="btn">
                                Salvar
                            </button>
                        </div>
                    </div>
                    {this.state.modoPizza == true && 
                        <div className="container-adicionar-produtos2" style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                            <label htmlFor="ingredientes">Sabores:</label>

                            <div className="form-group-ingredientes">
                                {this.state.ingredientes.map(ingrediente =>( 
                                    <div style={{display: 'flex', marginTop: '15px'}}>
                                            <div style={{ border: '1px solid #DDD',backgroundColor: '#fff', width: '50px', height: '50px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', cursor: 'pointer', fontSize: '10px'}}> Cliquei aqui para enviar a imagem </div>
                                            <input style={{marginLeft: '15px', marginTop: '5px', marginBottom: '0px'}} key={ingrediente.numero} ref={input => this.textIngredientInput = input} id={`ingrediente${ingrediente.numero}`} type="ingredient" name={`ingrediente + ${ingrediente.numero}`} placeholder={`Digite o sabor`} />
                                    </div>
                                ))}
    
                            </div>

                            <button onClick={() => this.adicionarIngrediente()} className="btnAdicionarIngredienete">
                                <IconContext.Provider value={{color: '#008000 ', size: 30}} >
                                    <IoIcons.IoMdAddCircle/>
                                </IconContext.Provider>
                            </button>
                        </div>
                        }

                    </div>

                </div>
            </div>
        )
    }
}
