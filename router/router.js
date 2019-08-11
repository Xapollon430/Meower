const express = require("express");
const app = express();
const router = express.Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.landingPage);
router.post("/mews", Controller.postMew);
router.get("/mews", Controller.getMew);
router.get("/v2/mews", Controller.getTenMews);

module.exports = router;
