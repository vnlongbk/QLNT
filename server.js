const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const path = require ('path');
const PORT = 8888;
const indexRouter = require('./routes/index')
const session = require('express-session')
const cors = require('cors')

const app = express();

mongoose.connect('mongodb://localhost/qlnt', { useNewUrlParser: true });
mongoose.Promise = Promise;



app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(session({
    secret: 'xxxxx',
    resave: true,
    saveUninitialized: false,
    cookie: { secure: true }
  }))
app
.use(bodyParser.json({
    limit: '50mb'
}))
.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));


app.use('/', indexRouter)


app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err)
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(PORT,() =>{
    console.log('app listening in port ' + PORT)
})

module.exports = app;
