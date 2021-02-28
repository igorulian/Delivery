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
import ArrowSvg from '../../../img/arrow.svg'
import AlertBox from '../../components/alertBox'
import ConfirmBox from '../../components/confirmBox'
import { Alert } from 'react-bootstrap'

export default class Cardapio extends Component{

    state = {
        products: [],
        categories: [],
        alert:{
            open: false,
            message: '',
            title: ''
          }
    }

    constructor() {
        super()
        this.state = { isLoading: true }
    }

    async componentDidMount(){
        await this.loadCategories()
        await this.loadProducts()
        this.setState({...this.state, isLoading: false, alert:{open: false, message: '', title: ''}})
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
            localStorage.setItem('token', '')
            this.alertar('Erro', 'Tivemos um erro ao tentar carregar os produtos, por favor tente novamente mais tarde :)')
        }
    }

    alertar = (title, message) => {
        this.setState({alert:{open: true, title, message}})
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
            localStorage.setItem('token', '')
            this.alertar('Erro', 'Tivemos um erro ao tentar carregar as categorias, por favor tente novamente mais tarde :)')
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
        if(!window.confirm('Deseja excluir essa categoria?')) return

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

                {this.state.alert.open && <AlertBox title={this.state.alert.title} message={this.state.alert.message} open={true} onClick={ () => { this.setState({alert: {open: false}})}}/>}
                
                <NavBar/>
                
                <div className='conteudo-cardapio'>
                        {console.log('--->' + this.state.categories.length)}
                            {this.state.categories && this.state.categories.map(category =>( 
                                <>
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
                                                    {console.log(product.imageUrl)}
                                                    <img style={{width: '80px', height:'80px', marginTop: '5px'}} src={product.imageUrl === '' ?  burgerImg : product.imageUrl}/>
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

                                {this.state.categories.length === 1 && this.state.products.length <= 0 &&
                                <div className='tutorial' style={{marginLeft: '-4.5%', marginTop: '7%'}}>
                                    <div>
                                        <img src={ArrowSvg}  style={{width: '50px', height: '50px',transform: 'rotate(180deg)', transform: 'scaleX(-1)'}}/>
                                    </div>
                                    <p> Clique aqui para adicionar</p>
                                    <p> seu primeiro produto</p>
                                </div>
                            }
                                
                                </>
                            ))}
                        
                            <Link to={'/dashboard/adicionar-categoria'} className="btnAdicionarCategoria" style={this.state.products.length <= 0 && this.state.categories.length >= 1 ? {backgroundColor: '#f9f9f9', textDecoration: 'none'} : {backgroundColor: '#fff', textDecoration: 'none' }}>
                                <IconContext.Provider value={{color: '#008000 ', size: 25}}>
                                    <AiIcons.AiOutlinePlus/>
                                </IconContext.Provider>
                                <div>
                                <p> Adicionar categoria</p>
                                </div>
                            </Link>
                            
                            {this.state.categories.length <= 0 && 
                                <div className='tutorial' style={{marginLeft: '2%', marginTop: '4%'}}>
                                    <div>
                                        <img src={ArrowSvg}  style={{width: '50px', height: '50px',transform: 'rotate(180deg)', transform: 'scaleX(-1)'}}/>
                                    </div>
                                    <div style={{backgroundColor: '#fff', borderRadius: '10px', padding: '5px'}}>
                                    <p> Clique aqui para adicionar</p>
                                    <p> sua primeira categoria</p>
                                    </div>
                                </div>
                            }
                </div>
            </div>
        )
    }
}
