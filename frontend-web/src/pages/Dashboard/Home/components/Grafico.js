import React , {Component} from 'react';
import { Chart } from "react-google-charts";
import './Grafico.css'

const options = {
    hAxis: { title: "Dias", viewWindow: { min: 1, max: 7} },
    vAxis: { title: "Vendas", viewWindow: { min: 0, max: 100 } },
    colors: ['#f0c910', '#e3552f'],
    legend: {position: 'none'}
  };

const data = [
    ["  ", " ", ""],
    ['Segunda', 12,24],
    ['Terça', 5.5,10],
    ['Quarta', 14,5],
    ['Quinta', 5,1],
    ['Sexta', 3.5,0],
    ['Sábado', 7,34],
    ['Domingo', 7,2]
];

const data2 = [
    ["  ", "", " "],
    ['Jan', 12,3],
    ['Fev', 57.5,34],
    ['Mar', 174,534],
    ['Abr', 85,342],
    ['Mai', 3.5,123],
    ['Jun', 87,98],
    ['Jul', 97,54],
    ['Ago', 32,200],
    ['Set', 87,23],
    ['Out', 70,123],
    ['Nov', 70,342],
    ['Dez', 70,10]
];


export default class Grafico extends Component{

    render(){
        return(
            <>
            {this.props.grafico === 'dia' ?
            <div style={{display: 'flex', marginLeft: '10px'}}>
                <div>
                    <p style={{marginRight: '40px', color: '#f0c910', width: '10px'}}><b>61</b></p>
                    <p style={{fontSize: '15px'}}>Semana passada</p>
                </div>
                <div style={{marginLeft: '20px'}}>
                    <p style={{marginRight: '50px', color: '#e3552f'}}><b>132</b></p>
                    <p style={{fontSize: '15px'}}>Essa semana</p>
                </div>
            </div>
            : 
            <div style={{display: 'flex', marginLeft: '10px'}}>
                <div>
                    <p style={{marginRight: '40px', color: '#f0c910', width: '10px'}}><b>456</b></p>
                    <p style={{fontSize: '15px'}}>Mês passado</p>
                </div>
                <div style={{marginLeft: '20px'}}>
                    <p style={{marginRight: '30px', color: '#e3552f'}}><b>978</b></p>
                    <p style={{fontSize: '15px'}}>Esse mês</p>
                </div>
            </div>
            }
            
                <Chart
                chartType="Bar"
                data={this.props.grafico === 'dia' ? data : data2}
                options={options}
                width="525px"
                height="300px"
                />
            </>
        )
    }
}