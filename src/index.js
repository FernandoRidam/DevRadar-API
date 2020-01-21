const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server( app );

setupWebsocket( server );

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb+srv://ridam:5533@cluster0-gtsrp.mongodb.net/OMNISTACK10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

// Métoods HTTP - GET, POST, PUT, DELETE

// Tipos de parâmetros
// Query Params: req.query (Filtros, ordenação, paginação, ... )
// Route Params: req.params ( Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de um registro)

// MongoDB (Banco não relacional)

server.listen(3333);