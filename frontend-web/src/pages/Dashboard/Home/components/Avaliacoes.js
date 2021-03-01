import React , {Component} from 'react';
import './Avaliacoes.css'
import * as MdIcons from 'react-icons/md/'
import {IconContext} from 'react-icons'


export default class Avaliacoes extends Component{
    
    avConteudo = (av) => (
        <div key={av.name} style={{textAlign: 'left', paddingLeft: '10px', marginTop: '10px'}}>
            <p style={{marginTop: '0px'}}>{av.name}</p>
            <p style={{marginTop: '0px'}}><IconContext.Provider value={{color: '#e3552f ', size: 20}}><MdIcons.MdStar/></IconContext.Provider>{parseFloat(av.rate)}</p>
            <p style={{marginTop: '0px', color: '#3f3f3f'}}>{av.text}</p>
            <div className="line" style={{marginRight: '15px', marginLeft: '5px',marginTop: '10px'}}>&nbsp;</div>
        </div>
    )

    state = {
        dados: this.props.dados,
        av: [
            {
                name: 'Igor',
                rate: 4,
                text: 'Gostei, pena que veio meio gelado'
            },
            {
                name: 'Lincu',
                rate: 4.3,
                text: 'Gostei, motoboy show!'
            },
            {
                name: 'Sandra',
                rate: 1.0,
                text: 'Não gostei.'
            },
        ]
    }

    render(){
        return(
            <div className="avaliacoes-container">
                <p>Avaliações</p>
                <div style={{marginTop: '20px'}}>
                    {this.state.av.map(avl => (
                        this.avConteudo(avl)
                    ))}
                </div>

            </div>
        )
    }
}