# Semana OmniStack 8

### **Objetivo**
 Este repositório é destinado ao aplicativo **TinDev**, que tem como função criar **Startups**, **Projetos** e **Novas tecnologias** encontrando por meio do **GitHub** desenvolvedores com idéias e gostos parecidos.

 **OBS:** Projeto desenvolvido em **uma semana** por meio do envento da Rocketseat.

# **Funcionalidades**
No momento o usuário se cadastra (ou faz login) somente com o nome de usuário do **GitHub** e fazendo **match** em real-time por meio da lib **socket.io**.

# **Próximas implementações**
Futuramente a aplicação possuíra as seguintes funcionalidades:

- Autenticação de usuário e senha
- Perfil de usuários
- Conversas em real-time
- Melhorar desempenho da aplicação
- Formação de grupo para desenvolvedores
- Filtro de desenvolvedores por habilidades
- Filtro de desenvolvedores por interesse
- Sincronização com discord

# **Aplicação atual**

### **Funcionamento WEB**
Por meio da seguinte demonstração podemos ver o funcionamento da aplicação **WEB** utilizando dois navegadores. Por meio do **socket.io** realizamos o **match** em **real-time**.

![Match mp4](https://user-images.githubusercontent.com/49616761/64822438-5ed99900-d58b-11e9-82ab-5a7dc689bd7a.gif)

#
### **Funcionamento WEB e Mobile**
Por meio da seguinte demonstração podemos ver que a aplicação **WEB** se comunica normalmente com a aplicação **Mobile** (android), possuindo também **match** em **real-time**.

![Match-Tindev](https://user-images.githubusercontent.com/49616761/64822485-7a44a400-d58b-11e9-83fc-bbb6b9f84202.jpeg)

### **Funcionamento banco de dados**

Por meio da seguinte demonstração podemos ver com clareza os dados da aplicação sendo armazenados por meio de uma instância no banco de dados **MongoDB ATLAS**. Aqui estamos utilizando somente uma **GUI** (ou interface gráfica) para visualização dos dados. 

**OBS:** É mostrado o **ID** de um usuário na "chave" **like** de outro usuário. Esse **ID** é gerado automáticamente.

![Mongo-TinDev mp4](https://user-images.githubusercontent.com/49616761/64822387-449fbb00-d58b-11e9-9ad5-ea90d38805d2.gif)

