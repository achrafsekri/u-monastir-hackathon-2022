const express = require("express");
const router = express.Router();

const { Etudiant } = require("../models/Etudiant");
const Seance = require("../models/Seance");

router.use(express.json());

router.get("/", async (req, res) => {
  if (req.query.filiere && req.query.td && req.query.tp) {
    res.json(await Etudiant.findByTp(filiere, td, tp));
    return;
  }
  if (req.query.filiere && req.query.td) {
    res.json(await Etudiant.findByTd(req.query.filiere, req.query.td));
    return;
  }
  if (req.query.filiere) {
    res.json(await Etudiant.findByFiliere(req.query.filiere));
    return;
  }
  if (req.query.cin) {
    res.json(await Etudiant.findByCin(req.query.cin));
    return;
  }
  if (req.query.email) {
    res.json(await Etudiant.findByEmail(req.query.email));
    return;
  }
  res.json(await Etudiant.find());
});

router.post("/signup", async (req, res) => {
  const result = await Etudiant.exists({ email: req.body.email });
  if (result !== null) {
    const etudiant = await Etudiant.findByEmail(req.body.email);
    etudiant.password = req.body.password;
    etudiant.save();
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
});

router.post("/signin", async (req, res) => {
  const result = await Etudiant.signIn(req.body.email, req.body.password);
  res.json(result);
});

router.post("/register-presence", async (req, res) => {
  try {
    if (req.body.code.length > 0) {
      const seance = await Seance.findOne({
        _id: req.body.seanceId,
        code: req.body.code,
      });
      const etudiant = await Etudiant.signIn(req.body.email, req.body.password);
      var result;
      if (seance !== null) {
        if (seance.inSeance(etudiant)) {
          if (!seance.presentStudents.includes(etudiant._id)) {
            seance.presentStudents.push(etudiant._id);
            seance.save();
            res.json({ ok: true });
            return;
          } else result = { message: "etudiant deja enregistre" };
        } else result = { message: "auth invalide" };
      } else result = { message: "code invalide" };
      res.json({ ...result, ok: false });
    }
  } catch (e) {
    res.json({ ok: false, message: e.message });
  }
});

router.post("/", async (req, res) => {
  const result = await Etudiant.exists({ cin: req.body.cin });
  if (result === null) {
    const etudiant = await Etudiant.create({ ...req.body });
    res.json({ ok: true });
  } else {
    res.json({ ok: false });
  }
});

module.exports = router;
