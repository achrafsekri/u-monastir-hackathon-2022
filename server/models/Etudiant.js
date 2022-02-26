const mongoose = require("mongoose");

const EtudiantSchema = new mongoose.Schema({
  cin: {
    type: String,
    required: false,
    unique: false,
    //binesba lil front end 7awlou mate5dmouch bil ObjectId mta3 mongodb i5smou 3al CIN
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  filiere: {
    type: String,
  },
  td: {
    type: String,
  },
  tp: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

EtudiantSchema.statics.findByFiliere = async function (filiere) {
  return await this.find({ filiere: new RegExp(filiere, "i") });
};

EtudiantSchema.statics.findByTd = async function (filiere, td) {
  const result = await this.find({
    filiere: new RegExp(filiere, "i"),
    td: new RegExp(td, "i"),
  });
  return result;
};

EtudiantSchema.statics.findByTp = async function (filiere, td, tp) {
  return await this.find({
    filiere: new RegExp(filiere, "i"),
    td: new RegExp(td, "i"),
    tp: new RegExp(tp, "i"),
  });
};

EtudiantSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email: new RegExp(email, "i") });
};

EtudiantSchema.statics.findByCin = async function (cin) {
  return await this.findOne({ cin });
};

EtudiantSchema.statics.signIn = async function (email, password) {
  const result = await this.exists({ email: new RegExp(email, "i"), password });
  if (result !== null) {
    const etudiant = await this.findOne({ email });
    return { ...etudiant._doc, connected: true };
  } else {
    return { connected: false };
  }
};

EtudiantSchema.statics.findFilieres = async function () {
  var result = await Etudiant.find().distinct("filiere").select("filiere");
  return result;
};

EtudiantSchema.statics.findSection = async function (filiere) {
  var result;
  var tds = await Etudiant.find({ filiere }).distinct("td").select("td", "tp");
  return tds;
};

const Etudiant = mongoose.model("Etudiant", EtudiantSchema);
module.exports = { Etudiant, EtudiantSchema };
