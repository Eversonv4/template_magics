const db = require("../util/database");
const Cart = require("./cart");

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    return await db.execute(
      "INSERT INTO products (title, price, description, imageUrl) Values (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {}

  static async fetchAll() {
    return await db.execute("SELECT * FROM products");
  }

  static async findById(id) {
    console.log(id);
    return await db.execute("SELECT * FROM products WHERE products.id = ?", [
      id,
    ]);
  }
};
