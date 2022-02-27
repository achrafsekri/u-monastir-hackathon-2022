const express = require("express");
const Seance = require("../models/Seance");
const { Etudiant } = require("../models/Etudiant");
const Enseignant = require("../models/Enseignant");
const mongoose = require("mongoose");
const router = express.Router();

router.use(express.json());

async function seanceToList(seance) {
  var result;
  if (seance.filiere && seance.td && seance.tp)
    result = await Etudiant.find({
      filiere: seance.filiere,
      td: seance.td,
      tp: seance.tp,
    });
  else if (seance.filiere && seance.td)
    result = await Etudiant.find({
      filiere: seance.filiere,
      td: seance.td,
    });
  else if (seance.filiere)
    result = await Etudiant.find({ filiere: seance.filiere });
  console.log(result);
  etudiants = [];
  for (let i = 0; i < result.length; i++) {
    var x = result[i];
    if (seance.isPresent(result[i]))
      etudiants.push({ ...result[i]._doc, presence: true });
    else etudiants.push({ ...result[i]._doc, presence: false });
  }
  console.log(etudiants);
  return { seance, etudiants };
}

// TODO: test
router.get("/", async (req, res) => {
  try {
    let result;
    if (req.query.enseignant) {
      if (req.query.filiere && req.query.td && req.query.tp) {
        result = await Seance.find({
          filiere: new RegExp(req.query.filiere, "i"),
          td: new RegExp(req.query.td, "i"),
          tp: new RegExp(req.query.tp, "i"),
          enRef: req.query.enseignant,
        });
      } else if (req.query.filiere && req.query.td) {
        result = await Seance.find({
          filiere: new RegExp(req.query.filiere, "i"),
          td: new RegExp(req.query.td, "i"),
          enRef: req.query.enseignant,
        });
      } else if (req.query.filiere) {
        result = await Seance.find({
          filiere: new RegExp(req.query.filiere, "i"),
          enRef: req.query.enseignant,
        });
      } else {
        result = await Seance.find({
          enRef: req.query.enseignant,
        });
      }
    } else {
      if (req.query.filiere && req.query.td && req.query.tp) {
        result = await Seance.findByFiliere(
          req.query.filiere,
          req.query.td,
          req.query.tp
        );
      } else if (req.query.filiere && req.query.td) {
        result = await Seance.findByFiliere(req.query.filiere, req.query.td);
      } else if (req.query.filiere) {
        result = await Seance.findByFiliere(req.query.filiere);
      } else {
        result = await Seance.find();
      }
    }
    /*if (req.query.enseignant) {
      result = await result.where({ enseignant: req.query.enseignant });
    }*/
    /*if (req.query.matiere) {
      result = await result.where({ matiere: req.query.matiere });
    }
    if (req.query.typeSeance) {
      result = await result.where({ typeSeance: req.query.typeSeance });
    }*/
    //result = await result.populate();
    for (let i = 0; i < result.length; i++) {
      var absentStudents;
      if (req.query.typeSeance && req.query.typeSeance.toLowerCase() === "tp") {
        absentStudents = await Etudiant.findByTp(
          result[i].filiere,
          result[i].td,
          result[i].tp
        );
      } else if (
        req.query.typeSeance &&
        (req.query.typeSeance.toLowerCase() === "td" ||
          req.query.typeSeance.toLowerCase() === "ci")
      ) {
        absentStudents = await Etudiant.findByTd(
          result[i].filiere,
          result[i].td
        );
      } else {
        /*if (
        req.query.typeSeance &&
        req.query.typeSeance.toLowerCase() === "cours"
      )*/
        absentStudents = await Etudiant.findByFiliere(result[i].filiere);
      }
      absentStudents = absentStudents.filter(
        (x) => !result[i].presentStudents.includes(x)
      );
    }
    result.absentStudents = absentStudents;
    res.json(result);
  } catch (e) {
    res.json({ ok: false, message: e.message });
    console.log(e);
  }
});

router.get("/etudiants", async (req, res) => {
  try {
    if (req.query.seanceId) {
      console.log(req.query.seanceId);
      const seance = await Seance.findOne({ _id: req.query.seanceId });
      console.log(seance);
      if (seance !== null) {
        res.json(await seanceToList(seance));
      }
    }
    res.json({ ok: false });
  } catch (e) {
    //res.json({ ok: false, message: e.message });
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const seance = await Seance.create({
      ...req.body,
      //   presentStudents: Array,
      code: null,
    });
    if (req.body.filiere && req.body.td && req.body.tp) {
      res.json({
        // seance,
        etudiants: await Etudiant.findByTp(
          req.body.filiere,
          req.body.td,
          req.body.tp
        ),
      });
      return;
    } else if (req.body.filiere && req.body.td) {
      res.json({
        // seance,
        etudiants: await Etudiant.findByTd(req.body.filiere, req.body.td),
      });
      return;
    } else if (req.body.filiere) {
      res.json({
        // seance,
        etudiants: await Etudiant.findByFiliere(req.body.filiere),
      });
      return;
    }
    res.json(await seanceToList(seance));
  } catch (e) {
    console.log(e.message);
  }
});

router.post("/generate-code", async (req, res) => {
  try {
    var result = await Enseignant.signIn(req.body.email, req.body.password);
    if (result.connected) {
      const seance = await Seance.findOne({
        _id: req.body.seanceId,
        enRef: result._id,
      });
      if (seance !== null) {
        /*var code = "";
        for (let i = 0; i < 10; i++) {
          code += `${Math.ceil(Math.random() * 100)}`;
        }
        seance.code = "seance:" + seance._id + ",code:" + code;
        seance.save();
        res.json({ ok: true, code: seance.code });
        return;*/
        seance.code = req.body.code
        await seance.save()
        console.log(seance)
        res.json({ok:true})
      } else {
        result = { message: "seance invalide" };
      }
    } else {
      result = { message: "auth invalide" };
    }
    res.json({ ...result, ok: false });
  } catch (e) {
    console.log(e);
    res.json({ ok: false, message: e.message });
  }
});

router.post("/register-presence", async (req, res) => {
  try {
    if (req.body.remove === false) {
      const seance = await Seance.findOne({
        _id: req.body.seanceId,
        code: req.body.code,
      });
      const enseignant = await Enseignant.signIn(
        req.body.email,
        req.body.password
      );
      if (enseignant.connected === true) {
        const etudiant = await Etudiant.findOne({ _id: req.body.etudiantId });
        var result;
        if (seance !== null) {
          if (seance.inSeance(etudiant)) {
            if (!seance.presentStudents.includes(etudiant._id)) {
              seance.presentStudents.push(etudiant._id);
              seance.save();
              res.json({ ok: true });
              return;
            } else result = { message: "etudiant deja enregistre" };
          } else result = { message: "etudiant invalide" };
        } else result = { message: "code invalide" };
      } else result = { message: "auth invalide" };
    } else {
    }
    res.json({ ...result, ok: false });
  } catch (e) {
    res.json({ ok: false, message: e.message });
  }
});


router.post("/update_presence", async (req, res) => {
  try {
    var seance = await Seance.findOne({ id: req.body.seanceId });
    await seance.updateOne({presence:req.body.presence})
    // if (req.body.presence) {
    //   seance.presentStudents.push(req.body.etudiantId);
    // } else {
    //   var presentStudents = [];
    //   for (i in seance.presentStudents) {
    //     if (i !== req.body.etudiantId) presentStudents.push(i);
    //   }
    //   seance.presentStudents = presentStudents;
    // }
    await seance.save();
    res.json({ ok: true });
  } catch (e) {
    res.json({ ok: false, message: e.message });
  }
});

// TODO: test
router.post("/end-seance", async (req, res) => {
  try {
    var result = await Enseignant.signIn(req.body.email, req.body.password);
    if (result.connected) {
      const seance = await Seance.findOne({
        _id: req.body.seanceId,
        enRef: result._id,
      });
      if (seance !== null) {
        seance.code = "";
        seance.save();
        res.json({ ok: true });
        return;
      } else {
        result = { message: "seance invalide" };
      }
    } else {
      result = { message: "auth invalide" };
    }
    res.json({ ...result, ok: false });
  } catch (e) {
    console.log(e.message);
    res.json({ ok: false, message: e.message });
  }
});

module.exports = router;
