import React , {Component} from 'react';
import { Chart } from "react-google-charts";
import './Grafico.css'

const options = {
    hAxis: { title: "Dias", viewWindow: { min: 1, max: 7} },
    vAxis: { title: "Vendas", viewWindow: { min: 0, max: 100 } },
    colors: ['#e3552f']
  };

const data = [
    ["Dias", ""],
    ['Segunda', 12],
    ['Terça', 5.5],
    ['Quarta', 14],
    ['Quinta', 5],
    ['Sexta', 3.5],
    ['Sabado', 7]
];

const data2 = [
    ["Meses", ""],
    ['Janeiro', 12],
    ['Fevereiro', 5.5],
    ['Março', 14],
    ['Abril', 5],
    ['Maio', 3.5],
    ['Junho', 7],
    ['Julho', 7],
    ['Agosto', 32],
    ['Setembro', 7],
    ['Outubro', 7],
    ['Novembro', 7],
    ['Dezembro', 7]
];

export default class Grafico extends Component{

    render(){
        return(
                <Chart
                chartType="Bar"
                data={this.props.grafico === 'dia' ? data : data2}
                options={options}
                width="700px"
                height="400px"
            />
        )
    }
}