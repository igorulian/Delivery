import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SideBarData = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Pedidos',
        path: '/dashboard/pedidos',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Pedidos Finalizados',
        path: '/dashboard/pedidos-finalizados',
        icon: <FaIcons.FaPaperPlane />,
        cName: 'nav-text'
    },
    {
        title: 'Cardápio',
        path: '/dashboard/cardapio',
        icon: <AiIcons.AiOutlineMenu />,
        cName: 'nav-text'
    }
]