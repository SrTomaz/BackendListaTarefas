
<h1>Backend da Lista de Tarefas em Tempo Real<h1></h1>

Esta aplicação é de uma lista de tarefas colaborativa com atualização em tempo real. Desenvolvido com Node.js e Express, fornece uma API RESTful para gerenciar tarefas e integra WebSocket via Socket.IO para comunicação em tempo real com os clientes.

As tarefas são persistidas localmente em um banco de dados Better-SQLite.

 <h3>Dependências principais</h3>

- express: Criação e gerenciamento de rotas e servidor HTTP
- better-sqlite3: Manipulação do banco de dados SQLite de forma síncrona
- socket.io: Comunicação em tempo real com os clientes via WebSocket
- cors: Habilita o compartilhamento de recursos entre diferentes origens
- dotenv: Carrega variáveis de ambiente de um arquivo `.env`

Comandos de instalação:

npm install express socket.io cors
npm install better-sqlite3

 <h3>Dependências de desenvolvimento para testes</h3>

- jest: Framework de testes JavaScript
- supertest: Utilitário para testar rotas HTTP

Comando de instalação:

npm install --save-dev jest supertest

 Instruções para rodar o projeto localmente:

1. Clone este repositório com:

git clone https://github.com/SrTomaz/BackendListaTarefas.git

2. Navegue até a pasta do projeto:

cd backend

3. Instale as dependências com:

npm install

4. Execute o servidor com:

npm start

5. O servidor estará disponível em:

http://localhost:3001

<h3>Testes</h3>
 
 Para rodar os testes unitários:

npm test
