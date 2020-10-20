import React , {Component} from 'react'
import './styles.css'
import NavBar from '../components/NavBar'
import {IconContext} from 'react-icons'
import * as IoIcons from 'react-icons/io'
import * as AiIcons from 'react-icons/ai'
import {Link} from 'react-router-dom'
import api from '../../../services/api'

export default class AddCategoria extends Component{

    state = {

    }

    salvarCategoria = async () =>{
        const name = this.textNameInput.value
        if(!name){
            alert("Preencha todos os campos!")
            return
        }

        const newCategory = {
            name
        }
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        
        await api.post(`/store/categories/create/${id}`,newCategory,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }).then(res => {this.seguirParaDashborad(res)})
            .catch(err => {console.log(err)})

    }


    seguirParaDashborad = (res) => {
        window.location.href = '/dashboard/cardapio'
        // console.log(res)
    }

    render(){
        return(
            <div className="page">
                <NavBar/>
                <div className="conteudo-adicionar-produtos">
                    
                    <button onClick={() => this.seguirParaDashborad()} className="btnVoltarAoCardapio2">
                        <IconContext.Provider value={{color: '#e3552f ', size: 30}} >
                            <AiIcons.AiOutlineArrowLeft/>
                        </IconContext.Provider>
                    </button>

                    <div className="container-adicionar-categoria">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="name">Categoria</label>
                                <input ref={input => this.textNameInput = input} type="name" name="name" placeholder="Digite o nome da categoria" />

                                {/* <label htmlFor="preco">Preço</label>
                                <input ref={input => this.textCostInput = input} type="preco" name="preco" placeholder="Digite o preço" /> */}

                            </div>

                            <button onClick={() => this.salvarCategoria()} type="button" className="btn">
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
