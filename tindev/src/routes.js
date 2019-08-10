import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import Main from './pages/Main';

export default createAppContainer( //Essa função precisa estar em volta de TODA a NAVEGAÇÃO, está na documentação do REACT NATIVE
  createSwitchNavigator({ //Cria uma navegação entre duas telas, sem nenhuma interface para o usuário. Sem animação, não conseguirá voltar para a tal página "facilmente" e etc..
    Login, //Aqui tem que ser em ordem, primeiro queremos que apareça a tela de Lonin
    Main,  //Em seguida a tela principal de quem conseguiu logar no app
  })
);