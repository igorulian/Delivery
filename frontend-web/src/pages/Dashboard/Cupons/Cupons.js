import React, {Component} from 'react';
import NavBar from '../components/NavBar'
import '../style.css'
import '../page-style.css'
import './Cupons.css'
import ReactLoading from 'react-loading';

export default class Cupons extends Component{

    state = {
        isLoading: true,
    }

    constructor(){
        super()
        this.setState({isLoading: true})
    }

    async componentDidMount(){
        this.setState({isLoading: false})
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
                    <div>
                        <h1> Cupons </h1>
                    </div>
                </div>
            </>
        );
    }
    
}
