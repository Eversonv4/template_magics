const fs = require("fs");
const path = require("path");

const fullPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(fullPath, (error, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!error) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + Number(productPrice);

      fs.writeFile(fullPath, JSON.stringify(cart), (error) => {
        console.log(error);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(fullPath, (error, fileContent) => {
      if (error) {
        return;
      }

      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((prod) => prod.id === id);
      console.log("UPDATED CART", updatedCart);
      console.log("PRODUCT ID", id);
      const productQuantity = product.quantity;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQuantity;

      fs.writeFile(fullPath, JSON.stringify(updatedCart), (error) => {
        console.log(error);
      });
    });
  }
};
