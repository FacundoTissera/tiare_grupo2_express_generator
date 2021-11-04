const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
//requiero el session
const session = require('express-session')
//requiero cookie-pareser
const cookies = require('cookie-parser');
//requerir el metodo para usar el put y el delete
const methodOverride = require ('method-override');


//requiere la funcion middleware de usuario logueado para manejar las vistas y barras de navegacion
const usuarioLogMiddleware = require ('./src/middlewares/usuarioLogMiddleware');

//requiere  las rutas de diferentes archivos
const productsRouter = require('./src/routes/products');
const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const cartRouter = require('./src/routes/cart')
const adminRouter = require ('./src/routes/admin');

//requiere las rutas de las APIs
const productsApiRouter= require ('./src/routes/api/productApiRouter');
//const userApiRouter= require('./src/routes/api/userApiRouter');


const app = express();
//ACA HAGO USO DE SESSION ↓
app.use(session({
    secret: 'archivo secreto',
    resave: false ,
    saveUninitialized: false,
}))

//utilizo cookie-pareser
app.use(cookies());
//USO EL MIDDLEWARE de usuario logueado OJO!!! tiene que ir despues de usar session
app.use(usuarioLogMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use(express.static(path.join(__dirname, 'public')));

//usar el put y el delete
app.use(methodOverride('_method'));

 //RUTAS DE LAS DIFERENTES PAGINAS
app.use('/', indexRouter);
app.use('/products',productsRouter);
app.use('/user',userRouter);
app.use('/cart',cartRouter);
app.use('/admin', adminRouter);

//RUTAS de las APIs
app.use('/api/products', productsApiRouter);
//app.use('/api/users', userApiRouter );

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
  
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  
});

module.exports = app;
