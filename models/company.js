const mongoose = require("mongoose");
const { isURL } = require("validator");

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    legalNumber: {
      type: String,
      required: true,
      unique: true,
    },
    incorporationCountry: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
      validate: [isURL, "Please provide a valid website url."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
