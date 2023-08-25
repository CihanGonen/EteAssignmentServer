const Company = require("../models/company");
const Product = require("../models/product");

const handleErrors = (err) => {
  let error = {
    name: "",
    legalNumber: "",
    incorporationCountry: "",
    website: "",
    general: "",
  };
  console.log(err.message, err.code);

  // duplicate key errors
  if (err.code === 11000) {
    error.legalNumber = "Legal Number is already registered.";
  }

  // validation errors
  if (err.message.includes("Company validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      error[properties.path] = properties.message;
    });
  }
  return error;
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCompany = async (req, res) => {
  res.json(res.data);
};

exports.createCompany = async (req, res) => {
  let ctx = req.body;

  const company = new Company({
    name: ctx.name,
    legalNumber: ctx.legalNumber,
    incorporationCountry: ctx.incorporationCountry,
    website: ctx.website,
  });

  try {
    const newCompany = await company.save();
    res.status(201).json(newCompany);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

exports.updateCompany = async (req, res) => {
  let ctx = req.body;
  res.data.name = ctx.name;
  res.data.legalNumber = ctx.legalNumber;
  res.data.incorporationCountry = ctx.incorporationCountry;
  res.data.website = ctx.website;
  try {
    let updatedCompany = await res.data.save();
    res.json(updatedCompany);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    let deletedCompany = await res.data.deleteOne();
    await Product.deleteMany({ company: deletedCompany._id });
    res.json(deletedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
