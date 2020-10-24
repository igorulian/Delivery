import React , {Component} from 'react'
import '../page-style.css'
import api from '../../../services/api'
import NavBar from '../components/NavBar'
import './styles.css'
import * as IoIcons from 'react-icons/io'
import * as AiIcons from 'react-icons/ai'
import {IconContext} from 'react-icons'
import CircularProgress from '@material-ui/core/CircularProgress';
import burgerImg  from '../../../img/hamburguer.svg'
import {Link} from 'react-router-dom'
import ReactLoading from 'react-loading';

export default class Cardapio extends Component{

    state = {
        products: [],
        categories: []
    }

    constructor() {
        super()
        this.state = { isLoading: true }
    }

    async componentDidMount(){
        await this.loadCategories()
        await this.loadProducts()
        this.setState({isLoading: false})
    }

    loadProducts = async () =>{
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            const response = await api.get(`/store/products/list/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })
            this.setState({products: response.data})
            console.log(response.data)
        }catch{
            console.log("Erro ao carregar produtos")
            alert("Erro ao carregar produtos")
        }
    }

    loadCategories = async () =>{
        try{
            const id = localStorage.getItem('id')
            const token = localStorage.getItem('token')
            const response = await api.get(`/store/categories/list/${id}`,{
                headers: {
                'Authorization': `Bearer ${token}` 
                }
            })
            this.setState({categories: response.data})
            // console.log(response.data)
        }catch{
            console.log("Erro ao carregar categorias")
            alert("Erro ao carregar categorias")
        }
    }

    pegarIngrediente = (products) => {
        let str = ''
        products.map(ingredient =>{
            str =  str + ingredient.name + ', '
        })
        str = str.replace(/,\s*$/, "");
        return str
    }

    excluirProduto = async (produtoId) => {
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token')
        const prodID = produtoId

        await api.delete(`/store/products/remove/${id}/${prodID}`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }).then((response) => {
              console.log("item excluido com sucsso!")
              this.loadProducts()
          })
    }

    excluirCategoria = async (catID) => {
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token')

        await api.delete(`/store/categories/delete/${id}/${catID}`,{
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          }).then((response) => {
              console.log("categoria excluida com sucsso!")
              this.loadCategories()
              this.loadProducts()
          })
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
            <div className='page'>
                <NavBar/>
                <div className='conteudo-cardapio'>
                            {this.state.categories.map(category =>( 
                            
                                <div key={category._id} className='categoria'>

                                    <div className='product-list'>

                                    <div className="divBtnExcluirCategoria">
                                        <button onClick={ () => {this.excluirCategoria(category._id)} }>
                                            <IconContext.Provider value={{color: '#333', size: 20}}>
                                                <IoIcons.IoMdCloseCircle/>
                                            </IconContext.Provider>
                                        </button>
                                    </div>

                                        <div className='product-list-title'>
                                            <IconContext.Provider value={{size: 30}}>
                                                <p className='categoria-titulo'> {category.name} </p>
                                                {/* <p> ___________________</p> */}
                                            </IconContext.Provider>
                                        </div>

                                        {this.state.products.map(product =>{
                                            // console.log(product.category + '-' + category._id)
                                            if(!(product.category === category._id)){   return   }
                                            return (
                                            <article key={product._id}>

                                                <div className="divBtnExcluirProduto">  
                                                    <button onClick={ () => this.excluirProduto(product._id) }>
                                                        <IconContext.Provider value={{color: '#ff0000', size: 25}}>
                                                            <IoIcons.IoMdCloseCircle/>
                                                        </IconContext.Provider>
                                                    </button>
                                                </div>

                                                <strong> {product.name} </strong>

                                                <div>
                                                    <img src={burgerImg}/>
                                                </div>

                                                <p> {this.pegarIngrediente(product.ingredient)} </p>

                                                <p className='custo'> <strong>R$ {product.cost} </strong></p>   

                                                {/* <a> Editar </a> */}
                                                

                                                
                                            </article>
                                            )
                                            
                                        })}

                                    <div className="btnAdicionarProduto">
                                        <Link to={`/dashboard/adicionar-produto/${category._id}`}>
                                            <IconContext.Provider value={{color: '#008000 ', size: 35}} >
                                                <IoIcons.IoMdAddCircle/>
                                            </IconContext.Provider>
                                        </Link>
                                    </div>

                                    </div>
                                </div>
                            ))}
                        
                            <Link to={'/dashboard/adicionar-categoria'} className="btnAdicionarCategoria" style={{ textDecoration: 'none' }}>
                                <IconContext.Provider value={{color: '#008000 ', size: 25}}>
                                    <AiIcons.AiOutlinePlus/>
                                </IconContext.Provider>
                                <div>
                                <p> Adicionar categoria</p>
                                </div>
                            </Link>
                </div>
            </div>
        )
    }
}
