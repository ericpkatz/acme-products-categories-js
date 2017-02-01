const app = require('express').Router();
const db = require('../db');
module.exports = app;

app.use( (req, res, next)=> {
  res.locals.page = 'categories';
  next();
});

app.get('/', (req, res, next)=> {
  res.render('categories', { categories: db.getCategories()});
});

app.post('/', (req, res, next)=> {
  let category = db.insertCategory(req.body);
  res.redirect(`/categories/${category.id}` );
});

app.delete('/:id', (req, res, next)=> {
  db.deleteCategory(req.params.id*1);
  res.redirect('/categories');
});

app.get('/:id', (req, res, next)=> {
  res.render('category', { category: db.getCategory(req.params.id*1)});
});

app.post('/:categoryId/products', (req, res, next)=> {
  db.insertProduct(req.body, req.params.categoryId*1);
  res.redirect(`/categories/${req.params.categoryId}` );
});

app.delete('/:categoryId/products/:id', (req, res, next)=> {
  db.deleteProduct(req.params.categoryId*1, req.params.id*1);
  res.redirect(`/categories/${req.params.categoryId}`);
});
