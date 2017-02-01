const express =  require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const swig = require('swig');
swig.setDefaults({ cache: false });

const app = express();

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);


const db = require('./db');

app.use((req, res, next)=> {
  res.locals.categories = db.getCategories();
  next();
});

app.get('/', (req, res, next)=> {
  res.render('index', { page: 'home' });
});

app.use('/categories', require('./routes/categories'));


const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on ${port}`));
