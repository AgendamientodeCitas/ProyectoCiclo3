const express = require('express')
var morgan = require('morgan')
var cors = require('cors')
const mongoose = require('mongoose');
const apiRouter = require('./routes')


const app = express()

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended : true }));
app.use(express.json());


// mongoDB Local
mongoose.Promise = global.Promise;
// const urlDB = 'mongodb://localhost:27017/agendamiento'
const urlDB = 'mongodb+srv://useragenda:kIGzuKrU7fvChLf1@agendamiento.0ozrj.mongodb.net/agendamedica?retryWrites=true&w=majority'
mongoose.connect(urlDB)
.then(mongoose => console.log('Conectados en ATLAS'))
.catch(err => console.log(err))

app.use('/api', apiRouter);

app.set('PORT', process.env.PORT || 3000);

app.listen(app.get('PORT'), () => {
  console.log(`Corriendo sobre http://localhost:${app.get('PORT')}`)
})
