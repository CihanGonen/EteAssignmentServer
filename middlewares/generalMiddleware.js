const Company = require("../models/company");
const Product = require("../models/product");

exports.getOneElementWithId = async (req, res, next, field) => {
  let data;
  try {
    if (field === "company") {
      data = await Company.findById(req.params.id);
    } else if (field === "product") {
      data = await Product.findById(req.params.id).populate("company").exec();
    }
    if (data === null) {
      return res.status(404).json({ error: "Cannot find " + field });
    }
  } catch (err) {
    res.status(500).json({ error: err.messsage });
  }

  res.data = data;
  next();
};
