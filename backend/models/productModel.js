const knex = require('../db.js');
const setupPaginator = require('knex-paginator');
const random = require('randomstring');
const moment = require('moment');

let Product = function() {};
let dateTime = Date.now();
dateTime = moment(dateTime).format("YYYY-MM-DD");
setupPaginator(knex);

Product.insertProduct = function(req, result) {
  let rand = random.generate();
  let id = rand;
  let img = Object.values(req.images_list);
  let data = { id : id, name: req.name, price: req.price, modify_date: dateTime, create_date: dateTime };
  let dataTime = dateTime;
  knex.transaction(function (t) {
    return knex("T_Product")
      .transacting(t)
      .insert(data)
      .then(function (response) {
        let data2 = []
        img.map(item => {
          data2.push({
            id : random.generate(), 
            product_id : id, 
            img: item, 
            modify_date: dataTime, 
            create_date:dateTime
          })
        });
        return knex('AT_ProductImages')
          .transacting(t)
          .insert(data2)
      })
      .then(t.commit)
      .catch(t.rollback)
  })
  .then(function (res) {
    result(null, res)
  })
  .catch(function (err) {
    result(err, null)
  });
};

Product.updateProduct = function(req, result) {
  let data = { name: req.name, modify_date: dateTime }
  if (req.price !== "") {
    data.price = req.price;
  }

  knex.transaction(function (t) {
    return knex("T_Product")
      .transacting(t)
      .where('id', req.id)
      .update(data)
      .then(t.commit)
      .catch(t.rollback)
  })
  .then(function (res) {
    result(null, res)
  })
  .catch(function (err) {
    result(err, null)
  });
}

Product.getAllProduct = function(req, result) {
  knex.from('T_Product').select("*")
    .paginate(5, req.page, true)
    .then((paginator) => {
      // console.log(paginator)
      let data = [];
      paginator.data.map(item =>{
        getItem = {
          id : item.id,
          name : item.name,
          price : item.price,
          images_list : {}
        }
        
        data.push(getItem);
      });
      result(null, data);
    })
    .catch((err) => { result(err, null) })
    .finally(() => {
        knex.destroy();
    });
}

Product.getProduct = function(id, result) {
  knex.from('T_Product').select("*")
    .where('id', id)
    .then((rows) => {
      rows.map(item =>{
        getItem = {
          id : item.id,
          name : item.name,
          price : item.price,
          images_list : {}
        }

        knex.from('AT_ProductImages').select("*")
          .where('product_id', item.id)
          .then((rows) => {
            let data = getItem;
            rows.map(item => {
              data.images_list.img = item.img;
            })

            result(null, data);
          })
          .catch((err) => { result(err, null) })
          .finally(() => {
              knex.destroy();
          });
        
      });
    })
    .catch((err) => { result(err, null) })
    .finally(() => {
        knex.destroy();
    });
}

Product.delProduct = function(id, result) {
  knex.transaction(function (t) {
    return knex("T_Product")
      .transacting(t)
      .where('id', id)
      .del()
      .then((res) =>{
        return knex('AT_ProductImages')
          .transacting(t)
          .del()
          .where('product_id', id)
      })
      .then(t.commit)
      .catch(t.rollback)
  })
  .then(function (res) {
    result(null, res)
  })
  .catch(function (err) {
    result(err, null)
  });
}


module.exports = Product;