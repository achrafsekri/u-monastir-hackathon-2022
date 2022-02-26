const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
// var url = "mongodb://localhost:27017/Gestion_Absences";
var url = "mongodb+srv://admin:adminadmin@cluster0.wyw6n.mongodb.net/Gestion_Absences?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const etudiantRouter = require("./routes/etudiant");
const enseignantRouter = require("./routes/enseignant");
const seanceRouter = require("./routes/seance");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/etudiant", etudiantRouter);

//enrigester etudiant
//object etudian => {cin, nom, prenom, filiere, td, tp, email, password}

app.use("/enseignant", enseignantRouter);
//{cin, nom, prenom, email, password}

app.use("/seance", seanceRouter);

app.listen(4000, () => console.log("Running on port 4000"));
