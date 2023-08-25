const Product = require("../models/product");
const Company = require("../models/company");

const handleErrors = (err) => {
  let error = {
    name: "",
    category: "",
    amount: "",
    amountUnit: "",
    company: "",
  };
  console.log(err.message, err.code);

  // validation errors
  if (err.message.includes("Product validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("company").exec();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  res.json(res.data);
};

exports.createProduct = async (req, res) => {
  let ctx = req.body;
  try {
    // check if company exists
    let company = await Company.findById(ctx.company);
    if (company === null) {
      return res.status(404).json({ error: "Cannot find company" });
    }

    const product = new Product({
      name: ctx.name,
      category: ctx.category,
      amount: ctx.amount,
      amountUnit: ctx.amountUnit,
      company: ctx.company,
    });

    const newProduct = await product.save();
    const returnProduct = await Product.findById(newProduct._id)
      .populate("company")
      .exec();
    res.status(201).json(returnProduct);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

exports.updateProduct = async (req, res) => {
  let ctx = req.body;

  res.data.name = ctx.name;
  res.data.category = ctx.category;
  res.data.amount = ctx.amount;
  res.data.amountUnit = ctx.amountUnit;
  res.data.company = ctx.company;

  try {
    // check if company exists
    let company = await Company.findById(ctx.company);
    if (company === null) {
      return res.status(404).json({ error: "Cannot find company" });
    }

    const updatedProduct = await res.data.save();
    const returnProduct = await Product.findById(updatedProduct._id)
      .populate("company")
      .exec();
    res.status(201).json(returnProduct);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    let deletedProduct = await res.data.deleteOne();
    res.json(deletedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
