var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var router = express.Router();
var exphbs = require('express-handlebars');
var helpers = require('./config/helper');
var morgan = require('morgan');


var app = express();


app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));
app.use(morgan('dev'));


var hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: helpers,   
    partialsDir: [
        'views/partials/'
    ]
});

app.engine('handlebars', hbs.engine);
app.use(express.static(process.cwd() + '/public'));
app.set('view engine', 'handlebars');



require('./controllers/burgers_controller.js')(app);


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.redirect('/mydashboard');
});

var port = process.env.PORT || 3000;
app.listen(port);