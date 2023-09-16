const express = require("express");
const app = express();
const cors = require("cors");
const moongose = require("mongoose");
const dotenv = require("dotenv").config();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 8080;

// DB_Connection // Server_Connection
console.log("url", process.env.MONGODB_URL);
moongose.set("strictQuery", false);
moongose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("database is connected");
  })
  .then(
    app.listen(PORT, () => {
      console.log(`server is running ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("errors occurs", err);
  });

//   Schema
const registerSchema = moongose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  confirmpassword: String,
  image: String,
});

// Model
const registerModel = moongose.model("register", registerSchema);

//   Api_config

app.get("/", (req, res) => {
  res.send({ message: "Registeration successfully" });
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;
  console.log("valuesss", email);
  const sendData = await registerModel.findOne(
    { email: email },
    (err, result) => {
      console.log("resultsss", result);
      console.log("errr", err);
      if (result) {
        res.send({ message: "Email is Already here", verify: false });
      } else {
        const data = registerModel(req.body);
        const save = data.save();
        res.send({ message: "Registeration successfully", verify: true });
      }
      console.log("resultsss", result);
    }
  );
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  registerModel
    .findOne({ email: email }, async (err, result) => {
      console.log("errr", result);
      if (result) {
        const temp = await result;
        password === temp.password
          ? res.send({ message: "Log in sucessfully", verify: true, userdata:temp})
          : res.send({ message: "Incorrect password", verify: false })
      } else {
        res.send({ message: "invalid email", verify: false });
        console.log("invalid email");
      }
    })
    .catch((err) => console.log("error occurs", err));
});
