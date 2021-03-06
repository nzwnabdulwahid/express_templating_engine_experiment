const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const handleBars = require("express-handlebars");

const app = express();

app.engine(
  "hbs",
  handleBars({
    layoutsDir: "views/layouts",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
);
// app.set("view engine", "hbs");

// app.set("view engine", "pug");
app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "hewo" });
});

app.listen(3000);
