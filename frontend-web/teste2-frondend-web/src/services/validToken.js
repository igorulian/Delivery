import api from './api'

export const validarToken = async() =>{

  if(!localStorage.getItem('token')){
    return false
  }

    const id = localStorage.getItem('id')

    const body = {
      id
    }
    const token = localStorage.getItem('token')

    // const token = 'adadadadadadaadadadad'

    // console.log("id: " + id)
    // console.log("token: " + token)
    
    await api.post('/store/auth/validtoken',body, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    .then((response) =>{
      console.log("Validado!")
      
      // if(window.location.href === 'http://localhost:3000/'){
      //    window.location.href = '/dashboard'
      // }
      return true
    })
    .catch((err) => {
      console.log("Nao Validado :|")
      // console.log(err)
      // window.location.href = '/login'
      return false
    })
}

export default validarToken()


