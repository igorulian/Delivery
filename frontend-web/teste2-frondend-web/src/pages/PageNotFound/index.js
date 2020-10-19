import React from 'react';
import {useNavigate} from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate()

    return (
      <div>
          <h1> Pagina não encontrada </h1>
          <button onClick={() =>navigate('/authenticate')}> Botao </button>
      </div>
  );
}

export default PageNotFound;
