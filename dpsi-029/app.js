var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories'); // Impor rute categories

var sequelize = require('./index');
var Category = require('./models/category'); // Impor model Category
var supplier = require('./models/supplier');
var authRouter = require('./routes/auth');
var Product = require('./models/product'); // Impor model Product

var shipper = require('./models/shipper');
var customer = require('./models/customer');
var Employee = require('./models/employee');
var order = require('./models/order');
var orderDetail = require('./models/orderDetail');
var app = express();

const port = process.env.PORT || 3000;  // Gunakan variabel lingkungan atau default ke 3000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Middleware untuk menyajikan file statis

app.use('/', indexRouter);
app.use('/users', usersRouter);
// Tambahkan ini di bagian setelah rute users
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter); // Gunakan rute categories
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Sinkronkan model dengan database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.error('Error synchronizing database:', err);
  });

module.exports = app;
