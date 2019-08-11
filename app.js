const express = require("express");
const app = express();
const Router = require("./router/router");
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", "views");
app.use(Router);

app.listen(3000, () => {
  console.log("Server is starting");
});
