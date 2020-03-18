const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


// Initializations
const app = express();
require('dotenv').config();
require('./config/passport');
require('./database');
//require('./routes/reviews');


// settings
var PRT = normalizePort(process.env.PORT || '3000');
app.set('port', PRT);


app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


// middlewares

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

// routes
app.use(require('./routes/index'));
app.use(require('./routes/spirits'));
app.use(require('./routes/users'));
//app.use(require('./routes/reviews'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PRT, () => {
    console.log(`Our app is running on port ${ PRT }`);
});

module.exports = app;