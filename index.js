const express = require('express');
const bodyparser = require('body-parser');

const app = new express();

const config = require('./config');

/* Modules*/
const auth = require('./Google/auth');
const action = require('./Google/action');
const interface = require('./Interface');


app.set('view engine', 'pug');
app.set('views', './Interface/views');

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyparser.json())

app.use('/auth', auth);
app.use('/action', action);
app.use('/', interface);

app.use((req,res)=>{
    console.log('Wow, wrong path: ',req.path);
})


app.listen(config.port, ()=>{
    console.log(`Action started on port ${config.port}`);
});