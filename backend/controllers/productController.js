const ProductModel = require('../models/productModel');

exports.insertProductC = function(req, res) {
  try {
    if (req.name === "" || req.price === "" || req.images_list === "") {
      res.status(400).send({err: true, message : 'Silhkan periksa kembali data yang anda masukan!'});
    } else {
      ProductModel.insertProduct(req.body, function(err, data){
        let message;
        let status = 400;
        let error = true;
        if (err) {
          message = 'Silhkan periksa kembali data yang anda masukan!';
        } else {
          error = false;
          status = 200;
          message = 'Data berhasil ditambahkan!';
        }
        res.status(status).send({error, message});
      });
    }
  } catch (error) {
    res.status(402).send({err: true, message : 'Harap hubungi adminstrator!'});
  }
}

exports.updateProduct = function(req, res) {
  try {
    if (req.body.name) {
      ProductModel.updateProduct(req.body, function(err, data) {
        let message;
        let status = 400;
        let error = true;
        if (err) {
          message = 'Silhkan periksa kembali data yang anda masukan!';
        } else {
          error = false;
          status = 200;
          message = 'Data berhasil diubah!';
        }
        res.status(status).send({error, message});
      });
    } else {
      res.status(400).send({err: true, message : 'Silhkan periksa kembali data yang anda masukan!'});
    }
  } catch (error) {
    res.status(402).send({err: true, message : 'Harap hubungi adminstrator!'});    
  }
}

exports.getAllProduct = function(req, res) {
  try {
    ProductModel.getAllProduct(req.params, function(err, data) {
      if (err) {
        res.status(402).send({err: true, message : 'Harap hubungi adminstrator!'});    
      } else {
        res.status(200).send(data);
      }
    })
  } catch (error) {
    res.status(402).send({err: true, message : 'Harap hubungi adminstrator!'});    
  }
}

exports.getProduct = function(req, res) {
  try {
    ProductModel.getProduct(req.params.id, function(err, data) {
      if (err) {
        res.status(402).send({err: true, message : 'Harap hubungi adminstrator!'});    
      } else {
        res.status(200).send(data);
      }
    })
  } catch (error) {
    res.status(402).send({err: true, message : 'Harap hubungi adminstrator!'});    
  }
}

exports.delProduct = function(req, res) {
  try {
    ProductModel.delProduct(req.params.id, function(err, data) {
      if (err) {
        res.status(400).send({err: true, message : 'Data gagal dihapus!'});    
      } else {
        res.status(200).send({err: true, message : 'Data berhasil dihapus!'});
      }
    })
  } catch (error) {
    res.status(402).send({err: true, message : 'Harap hubungi adminstrator!'});    
  }
}