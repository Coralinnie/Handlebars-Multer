const express = require('express');
const app = express(); 
const path = require('path');
const morgan = require('morgan'); 
const multer = require('multer');

//hbs
const exphbs = require('express-handlebars');

//settings
app.set('port', process.env.PORT || 3000);

//hbs
app.set('views', path.join(__dirname,'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs'); 

//middlewares
app.use(multer({
    dest : path.join(__dirname, 'public/uploads')
}).single('avatar'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/index1'));
app.use('/', require('./routes/form'));

app.post('/uploads', (req, res) => {
    console.log(req.file)
    res.send('subido');
});

//Static files
app.use('/public', express.static(path.join(__dirname, './public'))); 

app.listen(app.get('port'), () => {
    console.log(`Server on port${app.get('port')}`)
});