//Importa o módulo express
const express = require('express');
//Importa o módulo do mongoose, procura dentro do node_modules
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
//Obtém as rotas da aplicação, caminho na mesma pasta
const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

//Utiliza o exprress para rota da aplicação
const app = express();
const server = http.Server(app);

setupWebsocket(server);

// caminho definido pelo mongodb
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-nwy9a.mongodb.net/week10?retryWrites=true&w=majority', {
    //Remoção de warnnings    
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Faz com que o node libere o acesso externo para a aplicação
app.use(cors());
//Faz com que o express entenda requisições com o body no formato json
app.use(express.json()); //se usado app.get seria apenas para requisições do tipo get
//Precisa vir depois do express.json para que seja importado as configurações do json
app.use(routes);

//Define a porta da aplicação
server.listen(3333);