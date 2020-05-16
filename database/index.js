const mongoose = require("mongoose");
const faker = require("faker");
const dotenv = require("dotenv").config();

const myConnection = mongoose.connect(process.env.DB);
/* .then(() => {
    console.log("hurray were connected");
  })
  .catch((err) => {
    console.log("err=====>", err);
  }); */
// const myConnection = mongoose.connect(
//   "mongodb://127.0.0.1/fec_amazon_products"
// );
// mongodb://127.0.0.1/fec_amazon_products
const productdetailsSchema = mongoose.Schema({
  producer: String,
  urlFriendlyNumber: String,
  title: {
    type: String,
    required: true,
    default: "todo title",
  },
  description: {
    type: String,
    required: true,
    default: "todo description",
  },
  numberOfAnsweredQuestions: {
    type: Number,
    default: 0,
  },
  amazonsChoice: {
    type: Boolean,
    default: false,
  },
  primeDiscount: {
    type: String,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numberOfRatings: {
    type: Number,
    default: 0,
  },
  wasPrice: Number,
  currentPrice: {
    type: Number,
    required: true,
    default: 10,
  },

  // savings : Number
  inStock: {
    type: Boolean,
    default: true,
  },
  // string or link to multiple sellers...
  soldBy: {
    type: String,
    default: "amazon",
  },
  styles: [String],
  // string link to image url
  descriptions: [String],
  // For example fresh guarantee
  extraInfo: String,
  // Links
  compareOptions: String,
  technicalDetails: String,
  // used example New & Used (2) from $513.71
  Used: String,
  freeShipping: {
    type: Boolean,
    default: false,
  },
});

const productDetail = mongoose.model("productdetails", productdetailsSchema);

// make an array of fake descriptions

console.log("made db");

module.exports = { productDetail, myConnection };
