const express = require("express");
const router = express.Router();

const Enseignant = require("../models/Enseignant");
const Seance = require("../models/Seance");

router.use(express.json());

router.get("/", async (req, res) => {
  if (req.query.cin) {
    res.json(await Enseignant.findByCin(req.query.cin));
    return;
  }
  if (req.query.email) {
    res.json(await Enseignant.findByEmail(req.query.email));
    return;
  }
  res.json(await Enseignant.find());
});

router.post("/", async (req, res) => {
  const result = await Enseignant.exists({ cin: req.body.cin });
  if (result === null) {
    await Enseignant.create({ ...req.body, matiere: [] });
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
});

router.put("/", async (req, res) => {
  try {
    if (req.query.enseignant) {
      var result = await Enseignant.findByCin(req.body.cin);
      if (req.body.matiere) {
        result.matiere.push(req.body.matiere.toLowerCase());
        result.save();
        res.json({ ok: true });
        return;
      }
    }
    res.json({ ok: false });
  } catch (e) {
    res.json({ ok: false, message: e.message });
  }
});

router.post("/signup", async (req, res) => {
  const result = await Enseignant.exists({ email: req.body.email });
  if (result !== null) {
    const enseignant = await Enseignant.findByEmail(req.body.email);
    enseignant.password = req.body.password;
    enseignant.save();
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
});

router.post("/signin", async (req, res) => {
  const result = await Enseignant.signIn(req.body.email, req.body.password);
  res.json(result);
});

router.get("/etudiants", async (req, res) => {
  try {
    var result;
    if (req.body.enseignant) {
      const enseignant = await Enseignant.findOne({ id: req.body.enseignant });
      if (enseignant !== null) {
        var seances = await Seance.find({ enRef: req.body.enseignant }).select(
          "filiere",
          "td",
          "tp"
        );
      } else message = { message: "enseignant invalide" };
    } else {
      message = { message: "enseignant invalide" };
    }
    res.json({ ...message, ok: false });
  } catch (e) {
    res.json({ ok: false, message: e.message });
  }
});

module.exports = router;
