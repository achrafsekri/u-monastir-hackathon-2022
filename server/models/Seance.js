const mongoose = require("mongoose");
const SchemaSeance = require("./Seance");
const { SchemaEtudiant } = require("./Etudiant");
const SchemaEnseignant = require("./Enseignant");

const SeanceSchema = new mongoose.Schema({
  enRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
  },
  date: {
    type: String,
    required: true,
  },
  startAt: {
    type: String,
  },
  endAt: {
    type: String,
  },
  presentStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Etudiant",
    },
  ],
  typeSeance: String,
  filiere: {
    type: String,
    required: true,
  },
  td: {
    type: String,
  },
  tp: {
    type: String,
  },
  code: {
    type: String,
  },
  matiere: {
    type: String,
  },
});

SeanceSchema.methods.inSeance = function (etudiant) {
  return (
    etudiant.filiere.toLowerCase() === this.filiere.toLowerCase() &&
    etudiant.td.toLowerCase() === this.td.toLowerCase() &&
    etudiant.tp.toLowerCase() === this.tp.toLowerCase()
  );
};

SeanceSchema.methods.isPresent = function (etudiant) {
  return this.presentStudents.includes(etudiant._id)
}

SeanceSchema.statics.findByFiliere = async function (filiere) {
  const result = await this.find({ filiere: new RegExp(filiere, "i") });
  return result;
};

SeanceSchema.statics.findByTd = async function (filiere, td) {
  return await this.find({
    filiere: new RegExp(filiere, "i"),
    td: new RegExp(td, "i"),
  });
};

SeanceSchema.statics.findByTp = async function (filiere, td, tp) {
  return await this.find({
    filiere: new RegExp(filiere, "i"),
    td: new RegExp(td, "i"),
    tp: new RegExp(tp, "i"),
  });
};

SeanceSchema.query.byEnseignant = async function (enseignant) {
  return await this.where({ enRef: enseignant });
};

SeanceSchema.query.byMatiere = async function (matiere) {
  return await this.where({ matiere: new RegExp(matiere, "i") });
};

SeanceSchema.query.byType = async function (typeSeance) {
  return await this.where({ typeSeance: new RegExp(typeSeance, "i") });
};

const Seance = mongoose.model("Seance", SeanceSchema);
module.exports = Seance;
