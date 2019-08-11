const Validation = require("./validation");
const Mew = require("../models/mew");

const landingPage = async (req, res) => {
  res.render("index.ejs");
};

const postMew = async (req, res) => {
  if (Validation.isValidMew(req.body)) {
    let mew = {
      name: req.body.name.toString(),
      content: req.body.content.toString()
    };

    let response = await Mew.create(mew);
    res.send(response);
  } else {
    res.status(422);
    res.json({
      error: "Name and Content are required"
    });
  }
};

const getMew = async (req, res) => {
  let mewsJson = await Mew.find({});
  res.json(mewsJson);
};

const getTenMews = async (req, res) => {
  let mewsJson = await Mew.find();
  let page = req.query.number;
  let type = req.query.type;
  let tenMews;
  console.log(page);
  let maxPage = Math.ceil(mewsJson.length / 10);
  let number = parseInt(page.toString() + "0");
  console.log(number);

  if (req.query.initialize) {
    tenMews = mewsJson.slice(0, 10);
    res.json({
      tenMews: tenMews,
      page: 1
    });
    return;
  }
  if (type === "prev") {
    if (page == 1) {
      tenMews = mewsJson.slice(0, 10);
      res.json({
        tenMews: tenMews,
        page: 1
      });
    } else {
      console.log(number - 10);
      console.log(number);
      tenMews = mewsJson.slice(number - 20, number - 10);
      res.json({
        tenMews: tenMews,
        page: parseInt(page) - 1
      });
    }
  } else if (type === "next") {
    if (page == maxPage) {
      tenMews = mewsJson.slice(number - 10, number);
      res.json({
        tenMews: tenMews,
        page: maxPage
      });
    } else {
      tenMews = mewsJson.slice(number, number + 10);
      res.json({
        tenMews: tenMews,
        page: parseInt(page) + 1
      });
    }
  } else {
    res.json({
      error: "Wrong"
    });
  }
};

module.exports = {
  landingPage: landingPage,
  postMew: postMew,
  getMew: getMew,
  getTenMews: getTenMews
};
