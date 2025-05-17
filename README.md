
Backend da Lista de Tarefas em Tempo Real

Esta aplicação é o backend de uma lista de tarefas colaborativa com atualização em tempo real. Desenvolvido com Node.js e Express, fornece uma API RESTful para gerenciar tarefas e integra WebSocket via Socket.IO para comunicação em tempo real com os clientes.

As tarefas são persistidas localmente em um banco de dados Better-SQLite.

 Dependências principais

- express: Criação e gerenciamento de rotas e servidor HTTP
- better-sqlite3: Manipulação do banco de dados SQLite de forma síncrona
- socket.io: Comunicação em tempo real com os clientes via WebSocket
- cors: Habilita o compartilhamento de recursos entre diferentes origens
- dotenv: Carrega variáveis de ambiente de um arquivo `.env`

Comando de instalação:

npm install express better-sqlite3 socket.io cors dotenv

 Dependências de desenvolvimento (para testes)

- jest: Framework de testes JavaScript
- supertest: Utilitário para testar rotas HTTP

Comando de instalação:

npm install --save-dev jest supertest

 Instruções para rodar o projeto localmente:

1. Clone este repositório com:

git clone <URL_DO_REPOSITÓRIO>

2. Navegue até a pasta do projeto:

cd nome-do-projeto-backend

3. Instale as dependências com:

npm install

4. Execute o servidor com:

node index.js

5. O servidor estará disponível em:

http://localhost:3001 (ou a porta definida)

 Para rodar os testes unitários:

npm test
