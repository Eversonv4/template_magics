const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const Product = require("./models/product");
const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  const [user] = await User.findAll({ where: { id: 1 } });

  req.user = user;
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then(async (result) => {
    return await User.findByPk(1);
  })
  .then(async (user) => {
    if (!user) {
      return await User.create({ name: "Everson", email: "everson@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    app.listen(3000, () => console.log("It's working!"));
  })
  .catch((error) => {});

// db.execute("SELECT * FROM products")
//   .then((result) => console.log(result[0]))
//   .catch((error) => console.log(error));
