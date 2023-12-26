import React, { useEffect, useState } from 'react';
import './cursos.css'
import cursos from '../../pages/lista_cursos';
import CardCurso from '../card_serv/card_serv';
import firebase from 'firebase/compat/app';

const Cursos = () => {

  const [use, setUser] = useState([]);



  useEffect(() => {
    // Adicione um listener para o estado da autenticação
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            // Se não houver usuário autenticado, redirecione para a página de login
          
            const userData = {
                name: '',
                email: '',
                pictureUrl: '',
                tel: '',
                uid:'',
            }

            localStorage.setItem('users', JSON.stringify(userData));

        }
    });


    // Retorne uma função de limpeza para remover o listener quando o componente for desmontado
    return unsubscribe;
}, []);


  useEffect(() => {
    // Obtém o valor de 'users' do local storage quando o componente for montado
    const userString = localStorage.getItem('users');
    if(userString) {
      const user = JSON.parse(userString);
    setUser(user);
    }
    else {
      const userData = {
          name: '',
          email: '',
          pictureUrl: '',
          tel: '',
        }
      setUser(userData);
    }
  }, []);
    return (
  <div className='cursos container text-center'>
    <div className="" style={{marginTop:'6rem'}}>

    <h1 className='text-primary'>Nossos Cursos </h1>
 <p className='text-secondary f-12'>{use.name != '' ? use.name +' veja os' : ""} Cursos disponíveis presencialmente nas academias arotec e on-line em nossa plataforma</p>
 
    </div>
<center>

<div className=' row me-1 me-md-0'>
               
               {
               cursos.map((course) => (
                   <CardCurso key={course.id} c={course}/>
                   )
               )
             }
                  
              
           </div>
</center>

  </div>
)
    }

export default Cursos;