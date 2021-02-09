import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class SideBar extends Component {

  render() {
    return(
        <div className="container-sidebar">
            <div>
                <Link to={'/paodeforma/dashboard'}>
                    <button> Disponibilizar Restaurantes </button> 
                </Link>
            </div>

            <div>
                <Link to={'/paodeforma/dashboard/lista'}>
                    <button> Lista de Restaurantes </button> 
                </Link>
            </div>

            <div>
                <Link to={'/paodeforma/cupons'}>
                    <button> Cupons </button> 
                </Link> 
            </div>

            <div>
                <Link to={'/paodeforma/banners'}>
                    <button> Banners </button> 
                </Link>
            </div>
        </div>
    )
  }

}