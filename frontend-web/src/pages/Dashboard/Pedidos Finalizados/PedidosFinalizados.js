import React , { Component }from 'react'
import '../page-style.css'
import './styles.css'

import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar';
import './Calendario.css'

export default class PedidosFinalizados extends Component{

    state = {
        meses: []
    }

    componentDidMount(){
        const meses = [
            {
                name: "Janeiro",
                number: 1
            },
            {
                name: "Fevereiro",
                number: 2
            },
            {
                name: "Março",
                number: 3
            },
    
            {
                name: "Abril",
                number: 4
            },
            {
                name: "Maio",
                number: 5
            },
            {
                name: "Junho",
                number: 6
            },
            {
                name: "Julho",
                number: 7
            },
            {
                name: "Agosto",
                number: 8
            },
            {
                name: "Setembro",
                number: 9
            },
            {
                name: "Outubro",
                number: 10
            },
            {
                name: "Novembro",
                number: 11
            },
            {
                name: "Dezembro",
                number: 12
            },
    
        ]
        this.setState({meses: meses})
    }


    render() {

        return (
            <div className='page'>
                <NavBar/>
                    <div className='conteudo-pedidos-finalizados'>
                        {this.state.meses.map(mes =>(
                            <div key={mes.number} className="container-mes">

                                <div className="container-mes-header">
                                    <h3> {mes.name} </h3>
                                    {/* <p> {mes.number} </p> */}
                                </div>

                                <div>
                                    <p> 01/{mes.number} até 30/{mes.number}</p>
                                </div>

                                <div className="container-mes-bottom">
                                    {console.log('date now: ' + new Date().getMonth())}
                                    {console.log('mes.number: ' + mes.number)}
                                    {mes.number <= new Date().getMonth()+1 &&
                                    <Link to={`/dashboard/pedidos-finalizados/vizualizar-pedidos?mes=${mes.number}`}>
                                        <button className="btnVizualizarPedidos">
                                            Vizualizar Pedidos
                                        </button>
                                    </Link>
                                    }
                                    {mes.number > new Date().getMonth()+1  &&
                                    <button className="btnVizualizarPedidosOff">
                                        Vizualizar Pedidos
                                    </button>
                                    }
                                    {mes.number === new Date().getMonth() &&
                                    <button className="btnGerarBoletoOn">
                                        Gerar boleto
                                    </button>
                                    }
                                    {mes.number !== new Date().getMonth() &&
                                    <button className="btnGerarBoletoOff">
                                        Gerar boleto
                                    </button>
                                    }
                                </div>

                            </div>
                        ))} 
                        <Calendar maxDate={new Date()} navigationAriaLabel={null}/> 
                    </div>  
                    {/* <Calendar/>            https://www.npmjs.com/package/react-calendar*/} 
            </div>
        )
    }
}