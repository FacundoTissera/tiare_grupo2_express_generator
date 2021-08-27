const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//requiereo el session
const session = require('express-session')
//requerir el metodo para usar el put y el delete
const methodOverride = require ('method-override');

//requiere  las rutas de diferentes archivos

const productsRouter = require('./src/routes/products');
const indexRouter = require('./src/routes/index');
const userRouter = require('./src/routes/user');
const cartRouter = require('./src/routes/cart')
const adminRouter = require ('./src/routes/admin');

const app = express();

app.use(session({
    secret: 'archivo secreto',
    resave: false ,
    saveUninitialized: false,
}))
// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//usar el put y el delete
app.use(methodOverride('_method'));

 //RUTAS DE LAS DIFERENTES PAGINAS
app.use('/', indexRouter);
app.use('/products',productsRouter);
app.use('/user',userRouter);
app.use('/cart',cartRouter);
app.use('/admin', adminRouter);

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
