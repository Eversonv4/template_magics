const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  await req.user.createProduct({
    title,
    price,
    imageUrl,
    description,
  });

  console.log("Created product");

  res.redirect("/admin/products");
};

exports.getEditProduct = async (req, res, next) => {
  const { productId } = req.params;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const { dataValues: product } = await Product.findByPk(productId);

  if (!product) {
    return res.redirect("/");
  }

  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product: product,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const { productId, title, price, imageUrl, description } = req.body;

  const response = await Product.update(
    {
      title,
      price,
      imageUrl,
      description,
    },
    {
      where: { id: productId },
    }
  );

  return res.redirect("/admin/products");
};

exports.postDeleteProduct = async (req, res, next) => {
  const { productId } = req.body;
  await Product.destroy({ where: { id: productId } });
  res.redirect("/admin/products");
};

exports.getProducts = async (req, res, next) => {
  const rawProductsData = await Product.findAll();
  const products = rawProductsData.map((product) => product.dataValues);

  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
