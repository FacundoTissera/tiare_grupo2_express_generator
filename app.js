const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//requiere  las rutas de diferentes archivos

const productsRouter = require('./src/routes/products');
const indexRouter = require('./src/routes/index');
const loginRouter = require('./src/routes/login');
const cartRouter = require('./src/routes/cart')

const app = express();

app.use('/stylesheet',express.static(path.join(__dirname,'/stylesheet')))

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

 //RUTAS DE LAS DIFERENTES PAGINAS
app.use('/', indexRouter);
app.use('/products',productsRouter);
app.use('/login',loginRouter);
app.use('/Cart',cartRouter);

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
