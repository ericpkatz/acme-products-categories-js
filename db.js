let _categories = [
  {
    id: 1,
    name: 'Sports',
    products: [
      { id: 1, name: 'tennis racket'}
    ]
  },
];

const getCategories = ()=> _categories;

const getCategory = (id)=> getCategories().filter( category => category.id === id)[0];

const getId = (items)=> {
  let maxId = items.reduce( (max, item)=> {
    if(item.id > max){
      max = item.id;
    }
    return max;
  }, 0);
  return ++maxId;
}

const insertCategory = (category)=> {
  const categories = getCategories();
  category.id = getId(categories);
  getCategories().push(category);
  return category;
};

const deleteCategory = (id)=> {
  _categories = getCategories().filter( category => category.id !== id);
};

const insertProduct = (product, categoryId)=> {
  const category = getCategory(categoryId);
  if(!category.products){
    category.products = [];
  }
  product.id = getId(category.products);
  category.products.push(product);
}

const deleteProduct = (categoryId, id)=> {
  const category = getCategory(categoryId);
  category.products = category.products.filter( product => product.id !== id);
};

module.exports = {
  getCategories,
  getCategory,
  insertCategory,
  deleteCategory,
  insertProduct,
  deleteProduct
};
