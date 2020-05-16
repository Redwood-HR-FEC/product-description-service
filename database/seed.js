const mongoose = require("mongoose");
const faker = require("faker");
const fs = require("fs");
const { productDetail } = require("./index");

// const mySeedConnection = mongoose.connect(
//   "mongodb://127.0.0.1/fec_amazon_products"
// );
const mySeedConnection = mongoose.connect(`${process.env.DB}`);

const fakeDescriptions = () => {
  const howMany = faker.random.number(10);
  return Array(howMany)
    .fill(0)
    .map(() => {
      return `${faker.company.bsAdjective()} ${faker.commerce.color()} ${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.company.bsNoun()}`;
    });
};

const fakeStyles = () => {
  const howMany = faker.random.number(3);
  return Array(howMany)
    .fill(0)
    .map(() => {
      return faker.company.bsAdjective();
    });
};

const options = [0, 5];
// make a single fake review;
const rawOutput = [];

const makeFake = (idx) => {
  const padded = String(idx).padStart(3, "0");
  console.log("padded", padded);
  const rawProduct = {
    producer: faker.company.companyName(),
    urlFriendlyNumber: padded,
    title: faker.commerce.productName(),
    description: `${faker.commerce.productAdjective()} ${faker.company.bsAdjective()} ${faker.commerce.color()} ${faker.commerce.productMaterial()}`,
    rating: Number(
      `${faker.random.number(5)}.${options[Math.floor(Math.random() * 2)]}`
    ),
    wasPrice: faker.random.number(500),
    currentPrice: faker.random.number(500),
    soldBy: faker.company.companyName(),
    descriptions: fakeDescriptions(),
    numberOfAnsweredQuestions: faker.random.number(30),
    amazonsChoice: faker.random.boolean(),
    primeDiscount: faker.random.number(10),
    numberOfRatings: faker.random.number(20),
    inStock: faker.random.boolean(),
    freeShipping: faker.random.boolean(),
    styles: fakeStyles(),
  };
  rawOutput.push(rawProduct);
  const newProduct = productDetail.create(rawProduct).catch((err) => {
    console.log("err --->", err);
  });
};

// make n amount of fake descriptions
const makeNAmount = (amount) => {
  return Array(amount)
    .fill(0)
    .map((zero, idx) => makeFake(idx));
};

makeNAmount(100);
// console.log("fakeData", fakeData);

const sortedData = rawOutput.sort((a, b) => {
  const urlA = a.urlFriendlyNumber.toUpperCase();
  const urlB = b.urlFriendlyNumber.toUpperCase();
  if (urlA < urlB) {
    return -1;
  }
  if (urlA > urlB) {
    return 1;
  }
  return 0;
});

console.log("sorted", sortedData);

fs.writeFile(`${__dirname}/dataOutput.json`, JSON.stringify(sortedData), () => {
  console.log("data written");
});

mongoose.connection.close();
