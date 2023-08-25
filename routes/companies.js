const express = require("express");
const router = express.Router();
const {
  getAllCompanies,
  getCompany,
  createCompany,
  deleteCompany,
  updateCompany,
} = require("../controllers/companyController");
const { getOneElementWithId } = require("../middlewares/generalMiddleware");

const getCompanyWithId = (req, res, next) =>
  getOneElementWithId(req, res, next, "company");

router.get("/", getAllCompanies);
router.get("/:id", getCompanyWithId, getCompany);
router.post("/", createCompany);
router.patch("/:id", getCompanyWithId, updateCompany);
router.delete("/:id", getCompanyWithId, deleteCompany);

module.exports = router;
