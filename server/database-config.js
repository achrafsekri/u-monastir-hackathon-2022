const mongoose = require("mongoose");
var url =
  "mongodb+srv://admin:adminadmin@cluster0.wyw6n.mongodb.net/Gestion_Absences?retryWrites=true&w=majority";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
