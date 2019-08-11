const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Vehbi:Anakonda11@cluster0-zaujt.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

const Mew = mongoose.Schema({
  name: String,
  content: String
});

module.exports = mongoose.model("Mew", Mew);
