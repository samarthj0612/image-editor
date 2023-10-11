var express = require("express");
var router = express.Router();
var multer = require("multer");
var Jimp = require("jimp");

let sj;

function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("File extension is invalid"));
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/uploads");
  },
  filename: function (req, file, cb) {
    const fn = Date.now() + Math.floor(Math.random() * 10000) + file.originalname;
    sj = fn;
    cb(null, fn);
  },
});
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.get("/", function (req, res, next) {
  res.render("index");
});

var editedname;
router.post("/uploadimg", upload.single("img"), function (req, res) {
  editedname = Math.floor(Math.random() * 10000);
  res.render("imguploaded", { sj });
});

router.get("/greyscale", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-greyscale" + ".jpg";
    finalimg.greyscale().write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/invert", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-invert" + ".jpg";
    finalimg.quality(60).invert().write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/blur/:range", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-blur" + ".jpg";
    finalimg
      .blur(Number(req.params.range))
      .write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/mirror/:mode", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-mirror" + ".jpg";

    if (req.params.mode === "true") {
      console.log("Horizontal");
      finalimg.mirror(true, false);
    } else {
      console.log("vertical");
      finalimg.mirror(false, true);
    }
    finalimg.write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/square", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-square" + ".jpg";
    finalimg.crop(100, 100, 500, 500).write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/rotate/:degree", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-rotate" + ".jpg";
    finalimg
      .rotate(Number(req.params.degree))
      .write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/brightness/:range", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-brightness" + ".jpg";
    finalimg
      .brightness(Number(req.params.range) / 100)
      .write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/contrast/:range", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-contrast" + ".jpg";
    finalimg
      .contrast(Number(req.params.range) / 100)
      .write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

router.get("/normalize", function (req, res) {
  Jimp.read(`./public/images/uploads/${sj}`, (err, finalimg) => {
    if (err) throw err;
    var test = editedname + "-sj-normalize" + ".jpg";
    finalimg.normalize().write(`./public/images/edited/${test}`);

    res.json({ name: test });
  });
});

module.exports = router;
