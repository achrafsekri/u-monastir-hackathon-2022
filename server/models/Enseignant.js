const mongoose = require("mongoose");
const EnseignantSchema = new mongoose.Schema({
  cin: {
    type: String,
    required: true,
    unique: true,
    //binesba lil front end 7awlou mate5dmouch bil ObjectId mta3 mongodb i5smou 3al CIN
  },
  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  matiere: {
    type: [String],
  },
});

EnseignantSchema.statics.findByEmail = async function (email) {
  return await this.findOne({ email: new RegExp(email, "i") });
};

EnseignantSchema.statics.findByCin = async function (cin) {
  return await this.findOne({ cin });
};

EnseignantSchema.statics.signIn = async function (email, password) {
  const result = await this.exists({ email: new RegExp(email, "i"), password });
  if (result !== null) {
    var enseignant = await this.findOne({
      email: new RegExp(email, "i"),
      password,
    });
    return { ...enseignant._doc, connected: true };
  } else {
    return { connected: false };
  }
};

const Enseignant = mongoose.model("Enseignant", EnseignantSchema);
module.exports = Enseignant; // louled a3mlou tala 3ala kol models w ken fama haja haka wala haka 9oulouli
