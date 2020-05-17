const express = require("express");
const faker = require("faker");
const cors = require("cors");
const compression = require("compression");
const { productDetail, myConnection, fakeData } = require("../database");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 3002;

const app = express();

myConnection
  .then(() => {
    app.use(compression());
    console.log("hurray were connected");

    app.use(cors());
    app.use(express.json());
    // app.use(express.static("public"));

    // todo

    // general testing route

    app.get("/getbundle", (req, res) => {
      console.log("hitting");
      // console.log("path", `${__dirname}../public/bundle.js`);
      res.sendFile(`${__dirname}/../public/bundle.js`);
      // res.send(express.static(`${__dirname}./public/bundle.js`));
      // res.send(express.static(`${__dirname}../public/bundle.js`));
      // res.send("test bundle!");
    });

    // make a single product
    app.post("/makeproduct", (req, res) => {
      const newProductTemplate = {
        title: req.body.title || "todo title",
        description: req.body.description || "todo description",
        numberOfAnsweredQuestions: req.body.numberOfAnsweredQuestions || 0,
        amazonsChoice: req.body.amazonsChoice || false,
        primeDiscount: req.body.primeDiscount || "0",
        rating: req.body.rating || 0,
        numberOfRatings: req.body.numberOfRatings || 0,
        currentPrice: req.body.currentPrice || 10,
        inStock: req.body.inStock || true,
        soldBy: req.body.soldBy || "amazon",
        style: req.body.style || "basic style",
        descriptions: req.body.descriptions || [],
        freeShipping: req.body.freeShipping || false,
      };
      const myProduct = new productDetail(newProductTemplate);
      myProduct.save();
      res.json(myProduct);
    });

    // delete all from db
    app.delete("/deleteAll", (req, res) => {
      // why not delete?
      productDetail.deleteMany().then((deleted) => {
        res.send(deleted);
      });
    });

    app.get("/getallproducts", (req, res) => {
      productDetail.find().then((data) => {
        console.log("hitting==>>>>", data);
        res.json(data);
      });
    });

    app.get("/getsingleproduct/:id", (req, res) => {
      const { id } = req.params;
      console.log("hitting");
      productDetail.findOne({ urlFriendlyNumber: id }).then((data) => {
        console.log("data from single product", data);
        res.json(data);
      });
    });
    app.use("/:id", express.static(`${__dirname}/../public`));

    app.listen(PORT, () => console.log("listening on port 3002"));
  })
  .catch((err) => {
    console.log("err=====>", err);
  });
