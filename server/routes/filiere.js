const express = require("express");
const router = express.Router();
const { Etudiant } = require("../models/Etudiant");

router.get("/", async (req, res) => {
  if (req.query.filiere) {
    res.json(await Etudiant.findSection());
    return;
  }
  res.json(await Etudiant.findFilieres());
});
